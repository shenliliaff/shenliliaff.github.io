$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Speech
$root = Split-Path -Parent $PSScriptRoot
$scriptData = Get-Content (Join-Path $root "script.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$audioDir = Join-Path $root "public\audio"
New-Item -ItemType Directory -Force $audioDir | Out-Null
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$chineseVoice = $synth.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Culture.Name -eq "zh-CN" } | Select-Object -First 1
if (-not $chineseVoice) { throw "No local zh-CN speech voice is installed. Install a Chinese Windows voice before generating narration." }
$synth.SelectVoice($chineseVoice.VoiceInfo.Name)
$format = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(44100, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)

function Get-WavDuration($path) {
  $stream = [System.IO.File]::OpenRead($path)
  $reader = New-Object System.IO.BinaryReader($stream)
  try {
    $stream.Position = 12
    while ($stream.Position + 8 -le $stream.Length) {
      $id = [System.Text.Encoding]::ASCII.GetString($reader.ReadBytes(4))
      $size = $reader.ReadUInt32()
      if ($id -eq "data") { return $size / (44100 * 2.0) }
      $stream.Position += $size + ($size % 2)
    }
    throw "Missing WAV data chunk: $path"
  } finally {
    $reader.Dispose()
    $stream.Dispose()
  }
}

$clips = @()
try {
  foreach ($scene in $scriptData.scenes) {
    $budget = $scene.end - $scene.start - 0.7
    $accepted = $false
    for ($rate = 0; $rate -le 4; $rate++) {
      $synth.Rate = $rate
      $sceneClips = @()
      $total = 0.0
      for ($i = 0; $i -lt $scene.lines.Count; $i++) {
        $file = "$($scene.id)-$i.wav"
        $path = Join-Path $audioDir $file
        $synth.SetOutputToWaveFile($path, $format)
        $synth.Speak([string]$scene.lines[$i])
        $synth.SetOutputToNull()
        $duration = Get-WavDuration $path
        $sceneClips += [PSCustomObject]@{ file = $file; text = $scene.lines[$i]; duration = $duration }
        $total += $duration
      }
      $total += 0.08 * ($sceneClips.Count - 1)
      if ($total -le $budget) { $accepted = $true; break }
    }
    if (-not $accepted) { throw "Narration exceeds scene budget: $($scene.id). Shorten its text instead of truncating speech." }
    $cursor = [double]$scene.start + 0.35
    foreach ($clip in $sceneClips) {
      $clips += [PSCustomObject]@{
        file = $clip.file
        text = $clip.text
        startMs = [Math]::Round($cursor * 1000)
        endMs = [Math]::Round(($cursor + $clip.duration) * 1000)
        timestampMs = $null
        confidence = $null
        scene = $scene.id
        rate = $rate
      }
      $cursor += $clip.duration + 0.08
    }
    Write-Host "$($scene.id): $([Math]::Round($total, 2))s / $budget s; rate=$rate"
  }
  $json = ConvertTo-Json -InputObject @($clips) -Depth 5
  [System.IO.File]::WriteAllText((Join-Path $audioDir "clips.json"), $json, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host "Voice: $($chineseVoice.VoiceInfo.Name). Narration generated locally."
} finally {
  $synth.Dispose()
}

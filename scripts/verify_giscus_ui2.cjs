const fs=require('fs'),os=require('os'),path=require('path');const{spawn}=require('child_process');const http=require('http');
const CHROME='C://Program Files\\Google\\Chrome\\Application\\chrome.exe',CDP_PORT=9341,STATIC_PORT=8911;
const DIST=path.join(__dirname,'..','docs','.vuepress','dist');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ss=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/'||p.endsWith('/'))p+='index.html';const f=path.join(DIST,p);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('nf');return;}const m={'.html':'text/html','.js':'text/javascript','.css':'text/css'};res.setHeader('Content-Type',m[path.extname(f)]||'application/octet-stream');res.end(d);});});
class CDP{constructor(url){this.ws=new WebSocket(url);this.id=0;this.pending=new Map();this.handlers={};}ready(){return new Promise((res,rej)=>{this.ws.onopen=()=>res();this.ws.onerror=()=>rej(new Error('ws'));this.ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&this.pending.has(m.id)){const p=this.pending.get(m.id);this.pending.delete(m.id);m.error?p.rej(new Error(JSON.stringify(m.error))):p.res(m.result);}else if(m.method)(this.handlers[m.method]||[]).forEach(f=>f(m.params));};});}send(method,params){const id=++this.id;const p=new Promise((res,rej)=>{this.pending.set(id,{res,rej});setTimeout(()=>{if(this.pending.delete(id))rej(new Error(method+'超时'));},30000);});this.ws.send(JSON.stringify({id,method,params:params||{}}));return p;}}
(async()=>{
 await new Promise(r=>ss.listen(STATIC_PORT,'127.0.0.1',r));
 const profile=path.join(os.tmpdir(),'cdp-gis2-'+Date.now());
 const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--remote-debugging-port='+CDP_PORT,'--user-data-dir='+profile,'--window-size=1600,1200','about:blank'],{stdio:'ignore'});
 let ver=null;for(let i=0;i<50&&!ver;i++){try{ver=await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`).then(r=>r.json());}catch{await sleep(300);}}
 const target=await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`,{method:'PUT'}).then(r=>r.json());
 const c=new CDP(target.webSocketDebuggerUrl);await c.ready();await c.send('Page.enable');await c.send('Runtime.enable');await c.send('Network.enable');
 const netErrs=[];c.handlers['Network.loadingFailed']=[p=>netErrs.push(p.errorText+' '+p.blockedReason)];
 await c.send('Page.navigate',{url:`http://127.0.0.1:${STATIC_PORT}/blog/2026-10-19-four-hundred-pages.html`});
 await sleep(3000);
 // 强制滚到底部触发懒加载，并多次滚动
 for(let i=0;i<5;i++){await c.send('Runtime.evaluate',{expression:`window.scrollTo(0,document.body.scrollHeight);`});await sleep(1500);}
 const r=await c.send('Runtime.evaluate',{expression:`(function(){
   const gs=document.querySelector('giscus-widget');
   const ifr=document.querySelector('iframe.giscus-frame');
   return {widget:!!gs, widgetHTML:gs?gs.shadowRoot?gs.shadowRoot.innerHTML.slice(0,200):gs.innerHTML.slice(0,200):null, iframe:!!ifr, iframeSrc:ifr?ifr.src:null};
 })()`,returnByValue:true});
 console.log('结果:',JSON.stringify(r.result.value,null,2));
 console.log('网络失败:',netErrs.length?JSON.stringify(netErrs):'无');
 // 截图
 const shot=await c.send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(__dirname,'..','giscus-shot2.png'),Buffer.from(shot.data,'base64'));
 console.log('截图 giscus-shot2.png');
 c.ws.close();chrome.kill();ss.close();try{fs.rmSync(profile,{recursive:true,force:true});}catch{}
 process.exit(0);
})().catch(e=>{console.error('失败',e.message);process.exit(1);});

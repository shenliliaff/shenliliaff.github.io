/**
 * 评论功能完整端到端测试 v2（修正 mock 响应格式为 Waline 3.x 官方格式）
 * 验证：1) 评论列表渲染种子评论 2) 匿名提交新评论并出现在列表 3) 各页面评论区存在
 */
const fs=require('fs'),os=require('os'),path=require('path');const{spawn}=require('child_process');const http=require('http');
const CHROME='C://Program Files\\Google\\Chrome\\Application\\chrome.exe',CDP_PORT=9337,STATIC_PORT=8903,WALINE_PORT=8364;
const DIST=path.join(__dirname,'..','docs','.vuepress','dist');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const comments=[{objectId:'seed1',nick:'种子用户',mail:'',link:'',comment:'这是一条预先存在的测试评论',insertedAt:'2026-10-15T08:00:00.000Z',like:3,rid:null,sticky:false,browser:'Chrome',os:'Windows',label:'',addr:'',time:'2026-10-15 08:00'}];
const ok=(res,data)=>res.end(JSON.stringify({errno:0,errmsg:'',data}));
const ws=http.createServer((req,res)=>{res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');res.setHeader('Content-Type','application/json');if(req.method==='OPTIONS'){res.writeHead(204);res.end();return;}
 const u=new URL(req.url,'http://x');
 if(u.pathname==='/api/comment'&&req.method==='GET'){const t=u.searchParams.get('type');
  if(t==='list')return ok(res,{count:comments.length,totalPages:1,page:1,pageSize:10,data:comments});
  if(t==='count')return ok(res,[0,comments.length]);
  return ok(res,[]);}
 if(u.pathname==='/api/comment'&&req.method==='POST'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{const p=JSON.parse(b||'{}');const it={objectId:'m'+Date.now(),nick:p.nick||'匿名',mail:p.mail||'',link:p.link||'',comment:p.comment||'',insertedAt:new Date().toISOString(),like:0,rid:null,sticky:false,browser:'Chrome',os:'Windows',label:'',addr:'',time:new Date().toISOString().slice(0,16).replace('T',' ')};comments.push(it);ok(res,it);});return;}
 if(u.pathname==='/api/article'&&req.method==='POST')return ok(res,[{time:1}]);
 if(u.pathname==='/api/article'){const paths=(u.searchParams.get('path')||'').split(',').filter(Boolean);return ok(res,paths.map(()=>({time:0})));}
 if(u.pathname==='/api/user')return ok(res,null);
 return ok(res,[]);});
const ss=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/'||p.endsWith('/'))p+='index.html';const f=path.join(DIST,p);fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);res.end('nf');return;}const m={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};res.setHeader('Content-Type',m[path.extname(f)]||'application/octet-stream');res.end(d);});});
class CDP{constructor(url){this.ws=new WebSocket(url);this.id=0;this.pending=new Map();this.handlers={};}ready(){return new Promise((res,rej)=>{this.ws.onopen=()=>res();this.ws.onerror=()=>rej(new Error('ws'));this.ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&this.pending.has(m.id)){const p=this.pending.get(m.id);this.pending.delete(m.id);m.error?p.rej(new Error(JSON.stringify(m.error))):p.res(m.result);}else if(m.method)(this.handlers[m.method]||[]).forEach(f=>f(m.params));};});}send(method,params,sessionId){const id=++this.id;const p=new Promise((res,rej)=>{this.pending.set(id,{res,rej});setTimeout(()=>{if(this.pending.delete(id))rej(new Error(method+'超时'));},30000);});this.ws.send(JSON.stringify(sessionId?{id,method,params:params||{},sessionId}:{id,method,params:params||{}}));return p;}}
(async()=>{
 const placeholder='https://waline.vttjit.tech',local=`http://127.0.0.1:${WALINE_PORT}`;
 (function walk(d){for(const n of fs.readdirSync(d)){const fp=path.join(d,n);const st=fs.statSync(fp);if(st.isDirectory())walk(fp);else if(/\.(html|js)$/.test(n)){let s=fs.readFileSync(fp,'utf8');if(s.includes(placeholder))fs.writeFileSync(fp,s.split(placeholder).join(local));}}})(DIST);
 await new Promise(r=>ws.listen(WALINE_PORT,'127.0.0.1',r));await new Promise(r=>ss.listen(STATIC_PORT,'127.0.0.1',r));
 const profile=path.join(os.tmpdir(),'cdp-full-'+Date.now());
 const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--remote-debugging-port='+CDP_PORT,'--user-data-dir='+profile,'--window-size=1600,1200','about:blank'],{stdio:'ignore'});
 let ver=null;for(let i=0;i<50&&!ver;i++){try{ver=await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`).then(r=>r.json());}catch{await sleep(300);}}
 const target=await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`,{method:'PUT'}).then(r=>r.json());
 const c=new CDP(target.webSocketDebuggerUrl);await c.ready();await c.send('Page.enable');await c.send('Runtime.enable');
 const errs=[];c.handlers['Runtime.exceptionThrown']=[p=>errs.push((p.exceptionDetails.text||'')+' '+(p.exceptionDetails.exception?.description||'').slice(0,200))];
 const results=[];
 // 1. 打开文章页，等列表渲染
 await c.send('Page.navigate',{url:`http://127.0.0.1:${STATIC_PORT}/blog/2026-10-15-too-slow-to-chat.html`});
 await sleep(5000);
 const list=await c.send('Runtime.evaluate',{expression:`(function(){const w=document.getElementById('waline')||document.querySelector('#comment');return {seedVisible:w?w.innerText.includes('种子用户'):false,seedCommentVisible:w?w.innerText.includes('预先存在的测试评论'):false,listText:w?w.innerText.slice(0,300):'no-waline'};})()`,returnByValue:true});
 results.push({step:'1-列表渲染种子评论',...list.result.value});
 // 2. 匿名提交：填昵称+内容，点提交
 await c.send('Runtime.evaluate',{expression:`(function(){const n=document.querySelector('input[name="nick"]');if(n){n.value='端到端测试';n.dispatchEvent(new Event('input',{bubbles:true}));}const t=document.querySelector('textarea');if(t){t.value='自动化测试评论 '+Date.now();t.dispatchEvent(new Event('input',{bubbles:true}));}})()`});
 await sleep(500);
 await c.send('Runtime.evaluate',{expression:`(function(){const b=document.querySelector('.wl-btn');if(b)b.click();})()`});
 await sleep(2000);
 const after=await c.send('Runtime.evaluate',{expression:`(function(){const w=document.getElementById('waline')||document.querySelector('#comment');return {postedVisible:w?w.innerText.includes('端到端测试'):false,countText:(w?w.innerText.match(/评论\s*(\d+)/)||[])[1]||'':null};})()`,returnByValue:true});
 results.push({step:'2-匿名提交后可见',...after.result.value});
 // 3. 滚动到评论区截图
 await c.send('Runtime.evaluate',{expression:`const w=document.querySelector('#comment');if(w)w.scrollIntoView({block:'start'});`});
 await sleep(1000);
 const shot=await c.send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(path.join(__dirname,'..','comment-full.png'),Buffer.from(shot.data,'base64'));
 // 4. 其余页面评论区存在性
 for(const pg of [['hot榜单','/hot/index.html'],['notes追踪','/notes/AI%20%E5%8A%A8%E6%80%81%E8%BF%BD%E8%B8%AA.html'],['blog概览','/blog/index.html']]){
  await c.send('Page.navigate',{url:`http://127.0.0.1:${STATIC_PORT}${pg[1]}`});
  await sleep(4000);
  const ex=await c.send('Runtime.evaluate',{expression:`!!document.querySelector('#comment .wl-panel')`,returnByValue:true});
  results.push({step:'3-'+pg[0],commentMounted:ex.result.value});
 }
 console.log('===== 完整测试结果 =====');
 results.forEach(r=>console.log(JSON.stringify(r)));
 console.log('JS异常:',errs.length?errs:'无');
 console.log('截图: comment-full.png');
 c.ws.close();chrome.kill();ws.close();ss.close();try{fs.rmSync(profile,{recursive:true,force:true});}catch{}
 (function walk(d){for(const n of fs.readdirSync(d)){const fp=path.join(d,n);const st=fs.statSync(fp);if(st.isDirectory())walk(fp);else if(/\.(html|js)$/.test(n)){let s=fs.readFileSync(fp,'utf8');if(s.includes(local))fs.writeFileSync(fp,s.split(local).join(placeholder));}}})(DIST);
 process.exit(0);
})().catch(e=>{console.error('失败',e.message);process.exit(1);});

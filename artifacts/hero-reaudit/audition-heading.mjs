import fs from 'node:fs';
import path from 'node:path';
const tabs=await fetch('http://127.0.0.1:9222/json/list').then(r=>r.json());
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r));
let id=0; const pending=new Map();
ws.addEventListener('message',e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){pending.get(r.id)(r.result);pending.delete(r.id);}});
const send=(method,params={})=>new Promise(resolve=>{pending.set(++id,resolve);ws.send(JSON.stringify({id,method,params}));});
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:'http://localhost:3000'});
await new Promise(r=>setTimeout(r,1800));
await send('Runtime.evaluate',{expression:'document.fonts.ready',awaitPromise:true});
const candidates=[['inter-510','var(--font-hero-inter)',510],['arial-400','Arial',400],['arial-510','Arial',510],['segoe-510','Segoe UI',510],['tahoma-400','Tahoma',400]];
for(const [name,family,weight]of candidates){
  await send('Runtime.evaluate',{expression:`(()=>{const h=document.querySelector('h1');h.style.fontFamily=${JSON.stringify(family)};h.style.fontWeight=${weight};})()`});
  const {data}=await send('Page.captureScreenshot',{format:'png',clip:{x:345,y:153,width:750,height:114,scale:1}});
  fs.writeFileSync(path.join(import.meta.dirname,`heading-${name}.png`),Buffer.from(data,'base64'));
}
ws.close();

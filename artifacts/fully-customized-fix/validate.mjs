import fs from 'node:fs';
import path from 'node:path';
const __dirname = import.meta.dirname;
const phase = process.argv[2];
(async () => {
  const tabs = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener('open', resolve));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (pending.has(message.id)) {
      const {resolve, reject} = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(message.error);
      else resolve(message.result);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, {resolve, reject});
    ws.send(JSON.stringify({id, method, params}));
  });
  const evaluate = async expression => (await send('Runtime.evaluate', {expression, awaitPromise:true, returnByValue:true})).result.value;
  await send('Page.enable');
  const results = [];
  for (const width of [1440,1280,1024,768,390,320]) {
    await send('Emulation.setDeviceMetricsOverride', {width,height:1100,deviceScaleFactor:1,mobile:false});
    await send('Page.navigate', {url:'http://localhost:3000'});
    await new Promise(resolve => setTimeout(resolve, 1800));
    await evaluate(`(async()=>{await document.fonts.ready; document.querySelectorAll("img").forEach(i=>i.loading="eager"); await Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))); window.scrollTo(0,0)})()`);
    const measurement = await evaluate(`(()=>{
      const section=document.querySelector('[aria-labelledby="fully-customized-heading"]');
      const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}};
      const bounds=rect(section);
      const children=[...section.querySelectorAll('h2,p,a,img')].map(e=>({tag:e.tagName,...rect(e),overflowRight:Math.max(0,e.getBoundingClientRect().right-bounds.right),overflowLeft:Math.max(0,bounds.x-e.getBoundingClientRect().left)}));
      const p=section.querySelector('p'),range=document.createRange();range.selectNodeContents(p);
      const textRects=[...range.getClientRects()].map(r=>({right:r.right,left:r.left,bottom:r.bottom}));
      return {viewport:innerWidth,documentOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,section:bounds,sectionScrollOverflow:section.scrollWidth-section.clientWidth,children,textRight:Math.max(...textRects.map(r=>r.right)),textOverflow:Math.max(0,...textRects.map(r=>r.right-bounds.right))};
    })()`);
    results.push(measurement);
    const {data} = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:measurement.section.y,width,height:measurement.section.height,scale:1}});
    fs.writeFileSync(path.join(__dirname,`${phase}-${width}.png`),Buffer.from(data,'base64'));
  }
  fs.writeFileSync(path.join(__dirname,`${phase}-measurements.json`),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(r=>({width:r.viewport,pageOverflow:r.documentOverflow,sectionOverflow:r.sectionScrollOverflow,textRight:r.textRight,textOverflow:r.textOverflow,imageRight:r.children.find(c=>c.tag==='IMG').right})),null,2));
  ws.close();
})().catch(e=>{console.error(e);process.exit(1)});


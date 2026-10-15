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
      const hero=document.querySelector('[aria-labelledby="landing-hero-heading"]');
      const rect=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {label:e.alt||e.getAttribute('aria-labelledby')||e.textContent.trim(),x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom,font:c.fontFamily,fontSize:c.fontSize,fontWeight:c.fontWeight,spacing:c.letterSpacing,lineHeight:c.lineHeight,transform:c.transform,background:c.backgroundImage,backgroundColor:c.backgroundColor,color:c.color,radius:c.borderRadius,shadow:c.boxShadow,filter:c.filter,zIndex:c.zIndex,objectFit:c.objectFit,objectPosition:c.objectPosition,overflow:c.overflow}};
      const cards=[...hero.querySelectorAll('img')].map(e=>({...rect(e),src:e.getAttribute('src'),naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,clipped:Math.max(0,-e.getBoundingClientRect().left,e.getBoundingClientRect().right-innerWidth,e.getBoundingClientRect().bottom-hero.getBoundingClientRect().bottom)}));
      const pairs=cards.slice(1).map((c,i)=>({from:cards[i].label,to:c.label,horizontalGap:c.x-cards[i].right,topDifference:c.y-cards[i].y}));
      const cta=rect(hero.querySelector('a'));
      return {viewport:innerWidth,documentOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,hero:rect(hero),copy:rect(hero.querySelector('[class*="copy"]')),heading:rect(hero.querySelector('h1')),description:rect(hero.querySelector('p')),cta,composition:rect(hero.querySelector('[aria-label="Selected website previews"]')),cards,pairs,ctaToCards:Math.min(...cards.map(c=>c.y))-cta.bottom,cardBottomToHero:hero.getBoundingClientRect().bottom-Math.max(...cards.map(c=>c.bottom)),header:rect(document.querySelector('header')),otherSections:[...document.querySelectorAll('main section')].filter(e=>e!==hero).map(rect)};
    })()`);
    results.push(measurement);
    const {data} = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:measurement.hero.bottom+127,scale:1}});
    fs.writeFileSync(path.join(__dirname,`${phase}-${width}.png`),Buffer.from(data,'base64'));
    if(width===1440){
      const {data: below} = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:measurement.hero.bottom+160,width,height:4800,scale:1}});
      fs.writeFileSync(path.join(__dirname,`${phase}-outside-hero.png`),Buffer.from(below,'base64'));
    }
  }
  fs.writeFileSync(path.join(__dirname,`${phase}-measurements.json`),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(r=>({width:r.viewport,pageOverflow:r.documentOverflow,hero:r.hero.height,cardClipping:r.cards.map(c=>c.clipped)})),null,2));
  ws.close();
})().catch(e=>{console.error(e);process.exit(1)});


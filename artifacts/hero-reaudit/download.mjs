import fs from 'node:fs/promises';
import path from 'node:path';
const files = {
  'figma-hero-original.png': 'https://www.figma.com/api/mcp/asset/0cbd7318-45fd-4f90-8ceb-724621d49abb.png',
  'figma-inflatable.png': 'https://www.figma.com/api/mcp/asset/8b0e0844-b132-4c47-9bc5-45617b6a7d6d.png',
  'figma-neocultural.png': 'https://www.figma.com/api/mcp/asset/6c2f0cdc-2002-4d36-ab8e-f741266f949f.png',
  'figma-babyhush.png': 'https://www.figma.com/api/mcp/asset/09c198b5-1d00-41ff-9cc4-74eb80eebbfe.png',
  'figma-slice.png': 'https://www.figma.com/api/mcp/asset/0585bc9d-fc7c-4328-a44b-931e61519ab5.png',
  'figma-quiet.png': 'https://www.figma.com/api/mcp/asset/9317dba5-03cf-4230-b8e9-78b8ecd2c805.png',
};
await Promise.all(Object.entries(files).map(async ([name, url]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(path.join(import.meta.dirname, name), bytes);
  console.log(name, bytes.length);
}));
const css = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;510&display=swap').then(r=>r.text());
await fs.writeFile(path.join(import.meta.dirname, 'inter-source.css'), css);
console.log(css);

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
public static class OutsideCheck {
 public static string Compare(string aPath,string bPath){
  using(var a=new Bitmap(aPath))using(var b=new Bitmap(bPath)){
   int count=0,minX=a.Width,minY=a.Height,maxX=0,maxY=0;
   for(int y=0;y<a.Height;y++)for(int x=0;x<a.Width;x++)if(a.GetPixel(x,y).ToArgb()!=b.GetPixel(x,y).ToArgb()){
    count++;minX=Math.Min(minX,x);minY=Math.Min(minY,y);maxX=Math.Max(maxX,x);maxY=Math.Max(maxY,y);
   }
   return "Changed pixels="+count+"; bounds="+minX+","+minY+" to "+maxX+","+maxY;
  }
 }
}
'@
[OutsideCheck]::Compare((Join-Path $PSScriptRoot 'before-outside-hero.png'),(Join-Path $PSScriptRoot 'after-outside-hero.png')) | Tee-Object -FilePath (Join-Path $PSScriptRoot 'outside-pixel-check.txt')

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
public static class HeroComparison {
  public static void Run(string folder) {
    using(var reference=new Bitmap(Path.Combine(folder,"figma-hero-original.png")))
    using(var before=new Bitmap(Path.Combine(folder,"before-1440.png")))
    using(var after=new Bitmap(Path.Combine(folder,"after-1440.png")))
    using(var side=new Bitmap(2880,1094))
    using(var overlay=new Bitmap(1440,1094))
    using(var difference=new Bitmap(1440,1094)) {
      var regions=new[] {
        new Rectangle(0,90,1440,967), new Rectangle(345,153,750,114),
        new Rectangle(315,287,810,98), new Rectangle(651,398,138,40),
        new Rectangle(0,474,1440,531), new Rectangle(0,1057,1440,127),
        new Rectangle(0,90,300,380)
      };
      var names=new[]{"hero","heading","description","cta","cards","transition","background"};
      double[] oldError=new double[regions.Length], newError=new double[regions.Length];
      for(int y=90;y<1184;y++) for(int x=0;x<1440;x++) {
        var a=reference.GetPixel(x,y); var b=before.GetPixel(x,y); var c=after.GetPixel(x,y);
        int dr=Math.Abs(a.R-c.R),dg=Math.Abs(a.G-c.G),db=Math.Abs(a.B-c.B);
        side.SetPixel(x,y-90,a);side.SetPixel(x+1440,y-90,c);
        overlay.SetPixel(x,y-90,Color.FromArgb((a.R+c.R)/2,(a.G+c.G)/2,(a.B+c.B)/2));
        difference.SetPixel(x,y-90,Color.FromArgb(Math.Min(255,dr*4),Math.Min(255,dg*4),Math.Min(255,db*4)));
        for(int i=0;i<regions.Length;i++)if(regions[i].Contains(x,y)){
          oldError[i]+=Math.Abs(a.R-b.R)+Math.Abs(a.G-b.G)+Math.Abs(a.B-b.B);
          newError[i]+=dr+dg+db;
        }
      }
      side.Save(Path.Combine(folder,"side-by-side-1440.png"),ImageFormat.Png);
      overlay.Save(Path.Combine(folder,"overlay-50-percent.png"),ImageFormat.Png);
      difference.Save(Path.Combine(folder,"difference-4x.png"),ImageFormat.Png);
      using(var crop=reference.Clone(new Rectangle(0,90,1440,1094),PixelFormat.Format32bppArgb))crop.Save(Path.Combine(folder,"figma-hero-1440.png"),ImageFormat.Png);
      using(var crop=before.Clone(new Rectangle(0,90,1440,1094),PixelFormat.Format32bppArgb))crop.Save(Path.Combine(folder,"before-hero-1440.png"),ImageFormat.Png);
      using(var crop=after.Clone(new Rectangle(0,90,1440,1094),PixelFormat.Format32bppArgb))crop.Save(Path.Combine(folder,"after-hero-1440.png"),ImageFormat.Png);
      using(var writer=new StreamWriter(Path.Combine(folder,"visual-errors.csv"))) {
        writer.WriteLine("region,before_mean_channel_error,after_mean_channel_error");
        for(int i=0;i<regions.Length;i++)writer.WriteLine(names[i]+","+oldError[i]/(regions[i].Width*regions[i].Height*3.0)+","+newError[i]/(regions[i].Width*regions[i].Height*3.0));
      }
      int changedHeader=0;
      for(int y=0;y<90;y++)for(int x=0;x<1440;x++)if(before.GetPixel(x,y).ToArgb()!=after.GetPixel(x,y).ToArgb())changedHeader++;
      File.WriteAllText(Path.Combine(folder,"navbar-regression.txt"),"Changed Navbar pixels: "+changedHeader);
    }
  }
}
'@
[HeroComparison]::Run($PSScriptRoot)
Get-Content (Join-Path $PSScriptRoot 'visual-errors.csv')
Get-Content (Join-Path $PSScriptRoot 'navbar-regression.txt')

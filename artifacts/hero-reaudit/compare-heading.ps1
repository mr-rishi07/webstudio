Add-Type -AssemblyName System.Drawing
$reference=[System.Drawing.Bitmap]::new((Join-Path $PSScriptRoot 'figma-hero-original.png'))
$names=@('inter-510','arial-400','arial-510','segoe-510','tahoma-400')
$canvas=[System.Drawing.Bitmap]::new(750,684)
$results=@()
for($n=0;$n -lt $names.Count;$n++) {
  $candidate=[System.Drawing.Bitmap]::new((Join-Path $PSScriptRoot ('heading-'+$names[$n]+'.png')))
  $errorSum=0.0
  for($y=0;$y -lt 114;$y++){for($x=0;$x -lt 750;$x++){
    $a=$reference.GetPixel(($x+345),($y+153));$b=$candidate.GetPixel($x,$y)
    $errorSum+=[Math]::Abs([int]$a.R-$b.R)+[Math]::Abs([int]$a.G-$b.G)+[Math]::Abs([int]$a.B-$b.B)
    if($n -eq 0){$canvas.SetPixel($x,$y,$a)}
    $canvas.SetPixel($x,($y+114*($n+1)),$b)
  }}
  $results+=@{Font=$names[$n];MeanAbsoluteChannelError=$errorSum/(750*114*3)}
  $candidate.Dispose()
}
$canvas.Save((Join-Path $PSScriptRoot 'heading-fallback-comparison.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$canvas.Dispose();$reference.Dispose()
$results|ConvertTo-Json|Set-Content (Join-Path $PSScriptRoot 'heading-fallback-comparison.json')
$results|ConvertTo-Json

Add-Type -AssemblyName System.Drawing
$folder = $PSScriptRoot
$reference = [System.Drawing.Bitmap]::new((Join-Path $folder 'figma-reference-1440.png'))
$after = [System.Drawing.Bitmap]::new((Join-Path $folder 'after-1440.png'))
$before = [System.Drawing.Bitmap]::new((Join-Path $folder 'before-1440.png'))
$comparisons = @()
foreach ($entry in @(@{Name='before'; Image=$before}, @{Name='after'; Image=$after})) {
  $errorTotal = 0.0
  $changed = 0
  for ($y=0; $y -lt 90; $y++) {
    for ($x=0; $x -lt 1440; $x++) {
      $a=$reference.GetPixel($x,$y)
      $b=$entry.Image.GetPixel($x,$y)
      $difference=[Math]::Abs([int]$a.R-$b.R)+[Math]::Abs([int]$a.G-$b.G)+[Math]::Abs([int]$a.B-$b.B)
      $errorTotal += $difference
      if ($difference -gt 0) { $changed++ }
    }
  }
  $comparisons += @{Phase=$entry.Name; MeanAbsoluteChannelError=$errorTotal/(1440*90*3); ChangedPixels=$changed}
}
$comparisons | ConvertTo-Json | Set-Content (Join-Path $folder 'comparison.json')
$canvas = [System.Drawing.Bitmap]::new(1440,270)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.DrawImageUnscaled($reference,0,0)
$graphics.DrawImageUnscaled($before,0,90)
$graphics.DrawImageUnscaled($after,0,180)
$canvas.Save((Join-Path $folder 'reference-before-after.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$canvas.Dispose()
$reference.Dispose()
$before.Dispose()
$after.Dispose()
$comparisons | ConvertTo-Json

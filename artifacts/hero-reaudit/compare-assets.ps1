Add-Type -AssemblyName System.Drawing
$pairs = @(
  @('quiet','quiet-technology'), @('slice','slice-debit'), @('babyhush','babyhush'),
  @('neocultural','neocultural-couture'), @('inflatable','inflatable-illustrations')
)
$results = foreach($pair in $pairs) {
  $source=[System.Drawing.Bitmap]::new((Join-Path $PSScriptRoot ('figma-'+$pair[0]+'.png')))
  $local=[System.Drawing.Bitmap]::new((Join-Path (Get-Location) ('public/images/landing/hero/hero-card-'+$pair[1]+'.png')))
  $errorSum=0.0; $different=0
  for($y=0;$y -lt $source.Height;$y++) { for($x=0;$x -lt $source.Width;$x++) {
    $a=$source.GetPixel($x,$y);$b=$local.GetPixel($x,$y)
    $difference=[Math]::Abs([int]$a.R-$b.R)+[Math]::Abs([int]$a.G-$b.G)+[Math]::Abs([int]$a.B-$b.B)+[Math]::Abs([int]$a.A-$b.A)
    $errorSum+=$difference
    if($difference -gt 0){$different++}
  }}
  [PSCustomObject]@{Card=$pair[0];Width=$source.Width;Height=$source.Height;DifferentPixels=$different;MeanChannelError=$errorSum/($source.Width*$source.Height*4)}
  $source.Dispose();$local.Dispose()
}
$results | ConvertTo-Json | Set-Content (Join-Path $PSScriptRoot 'asset-comparison.json')
$results | Format-Table

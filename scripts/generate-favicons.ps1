Add-Type -AssemblyName System.Drawing
$srcPath = "D:\portfolio\public\saravana-new-photo.png"
$src = [System.Drawing.Image]::FromFile($srcPath)

function Make-CircularIcon($size, $destPath) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse(1, 1, $size - 2, $size - 2)
    $g.SetClip($path)
    $g.DrawImage($src, 0, 0, $size, $size)
    $g.ResetClip()

    # Subtle cyan border to make the avatar pop on both dark and light browser tab bars
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 56, 189, 248), 1.5)
    $g.DrawEllipse($pen, 1, 1, $size - 2, $size - 2)

    $g.Dispose()
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Make-CircularIcon 128 "D:\portfolio\app\icon.png"
Make-CircularIcon 180 "D:\portfolio\app\apple-icon.png"
Make-CircularIcon 32 "D:\portfolio\public\favicon-32x32.png"
Make-CircularIcon 32 "D:\portfolio\public\favicon.ico"
Make-CircularIcon 32 "D:\portfolio\app\favicon.ico"

$src.Dispose()
Write-Output "Favicons generated successfully"

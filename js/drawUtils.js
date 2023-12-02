function colorRect(x, y, width, height, color) {
    c.fillStyle = color
    c.fillRect(x, y, width, height)
}

function colorStrokeRect(x, y, width, height, strokeStyle) {
    c.strokeStyle = strokeStyle
    c.lineWidth = 4
    c.strokeRect(x,y,width,height)      
}

function colorCircle(centerX, centerY, radius, fillColor) {
    c.fillStyle = fillColor;
    c.beginPath();
    c.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    c.fill();
}

function drawBitmapCenteredWithRotation(x, y, image, angle) {
    c.save()
    c.translate(x, y)
    c.rotate(angle)
    c.drawImage(image, -image.width / 2, -image.height / 2)
    c.restore()
}

function colorText(x, y, text, color) {
    c.fillStyle = color
    c.font = "24px monospace"
    c.fillText(text, x, y)
}
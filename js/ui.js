let leftX = 0
let topY = canvas.height - 100

function drawPlayerFuelMeter() {
    let remainingFuelWidth = player.fuel / MAX_FUEL * 400
    
    colorText(BLOCK_WIDTH-3, topY + BLOCK_HEIGHT + 8, "Fuel", "black")
    colorStrokeRect(BLOCK_WIDTH-3, topY + BLOCK_HEIGHT * 2-2, 400, 20, "black")
    colorRect(BLOCK_WIDTH, topY + BLOCK_HEIGHT * 2, remainingFuelWidth, 16, "red")
}

function drawPlayerLives() {
    for (let i = 0; i < player.lives; i++) {
        c.drawImage(imageMap.playerDefault, BLOCK_WIDTH-3 + i*BLOCK_WIDTH*1.5, topY + BLOCK_HEIGHT * 3.5 )
    }
}

function drawLevelIndicator() {
    colorText(canvas.width - 125, topY + BLOCK_HEIGHT + 8, `Level: ${level+1}`, "black")
}

function drawUI() {
    colorRect(leftX, topY, canvas.width, 100, "gray")
    drawPlayerFuelMeter()
    drawPlayerLives()
    drawLevelIndicator()
}
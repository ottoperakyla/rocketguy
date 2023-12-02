let UITopY = canvas.height - 100

function drawPlayerFuelMeter() {
    let remainingFuelWidth = player.fuel / MAX_FUEL * 400
    
    colorText(BLOCK_WIDTH-3, UITopY + BLOCK_HEIGHT + 8, "Fuel", "black")
    colorStrokeRect(BLOCK_WIDTH-3, UITopY + BLOCK_HEIGHT * 2-2, 400, 20, "black")
    colorRect(BLOCK_WIDTH, UITopY + BLOCK_HEIGHT * 2, remainingFuelWidth, 16, "red")
}

function drawPlayerLives() {
    for (let i = 0; i < player.lives; i++) {
        c.drawImage(imageMap.playerDefault, BLOCK_WIDTH-3 + i*BLOCK_WIDTH*1.5, UITopY + BLOCK_HEIGHT * 3.5 )
    }
}

function drawLevelIndicator() {
    colorText(canvas.width - 125, UITopY + BLOCK_HEIGHT + 8, `Level: ${level+1}`, "black")
}

function drawUI() {
    colorRect(0, UITopY, canvas.width, 100, "gray")
    drawPlayerFuelMeter()
    drawPlayerLives()
    drawLevelIndicator()
}
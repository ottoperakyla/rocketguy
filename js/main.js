let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")
let fps = 30

let player
let grid
let towers

let level = 0
let levels = [levelOne, levelTwo]

function loadLevel() {
    grid = []
    towers = []
    
    for (let i = 0; i < levels[level].length; i++) {
        grid[i] = levels[level][i]
    }
    
    for (let col = 0; col < GRID_COLS; col++) {
        for (let row = 0; row < GRID_ROWS; row++) {
            let gridIndex = colRowToGridIndex(col, row)

            xPos = BLOCK_WIDTH * col + BLOCK_WIDTH / 2
            yPos = BLOCK_HEIGHT * row + BLOCK_HEIGHT / 2

            // init player position
            if (grid[gridIndex] === PLAYER_START) {
                grid[gridIndex] = GRID_EMPTY
                player.x = xPos
                player.y = yPos
            }

            // init towers
            if (grid[gridIndex] === GRID_TOWER) {
                towers.push(new Tower(xPos, yPos))
            }
        }
    }

    player.reset()
}

function gameloop() {
    colorRect(0, 0, canvas.width, canvas.height, "black")
    
    player.move()
    towers.forEach(tower => tower.move())

    drawGrid()
    drawUI()

    player.draw()
}

imagesLoaded().then(function(images) {
    imageMap = Object.fromEntries(images)
    player = new Player(0, 0)
    
    loadLevel()
    initInput()    
    setInterval(gameloop, 1000 / fps)
})

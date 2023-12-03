let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")
let fps = 30

let player
let grid
let towers

let level = 2
let levels = [levelOne, levelTwo, levelThree]

function loadLevel() {
    grid = []
    towers = []
    movingPlatforms = []
    
    for (let i = 0; i < levels[level].length; i++) {
        grid[i] = levels[level][i]
    }
    
    for (let col = 0; col < GRID_COLS; col++) {
        for (let row = 0; row < GRID_ROWS; row++) {
            let gridIndex = colRowToGridIndex(col, row)

            xPos = BLOCK_WIDTH * col 
            yPos = BLOCK_HEIGHT * row 

            // init player position
            if (grid[gridIndex] === PLAYER_START) {
                grid[gridIndex] = GRID_EMPTY
                // player.x is player's midpoint, so add BLOCK_WIDTH / 2 to x and y
                player.x = xPos + BLOCK_WIDTH / 2
                player.y = yPos + BLOCK_HEIGHT / 2
            }

            // init towers
            if (grid[gridIndex] === GRID_TOWER) {
                towers.push(new Tower(xPos, yPos))
            }

            // init moving platforms
            if (grid[gridIndex] === GRID_MOVING_PLATFORM) {
                grid[gridIndex] = GRID_EMPTY
                movingPlatforms.push(new MovingPlatform(xPos, yPos))
            }
        }
    }

    player.reset()
}

function gameloop() {
    colorRect(0, 0, canvas.width, canvas.height, "black")
    
    player.move()
    
    towers.forEach(tower => 
        tower.shootAtPlayerIfInSight())
    
    movingPlatforms.forEach(movingPlatform => 
        movingPlatform.move())

    drawGridStaticObjects()
    drawUI()

    player.draw()
    movingPlatforms.forEach(movingPlatform => 
        movingPlatform.draw())
}

imagesLoaded().then(function(images) {
    imageMap = Object.fromEntries(images)
    player = new Player(0, 0)
    
    loadLevel()
    initInput()    
    setInterval(gameloop, 1000 / fps)
})

const GRID_COLS = 40
const GRID_ROWS = 30
const BLOCK_WIDTH = 20
const BLOCK_HEIGHT = 20

const GRID_EMPTY = 0
const GRID_WALL = 1
const PLAYER_START = 2
const GRID_OUT_OF_BOUNDS = -1
const GRID_SPIKES_UP = 3
const GRID_SPIKES_DOWN = 4
const GRID_SPIKES_LEFT = 5
const GRID_SPIKES_RIGHT = 6
const GRID_ICE = 7
const GRID_FUEL = 8
const GRID_GOAL = 9
const GRID_TOWER = 10
const GRID_MOVING_PLATFORM = 11

const WALL_COLOR = "blue"
const ICE_COLOR = "lightblue"
const WALL_MARGIN = 2

function drawGridStaticObjects() {
    for (let col = 0; col < GRID_COLS; col++) {
        for (let row = 0; row < GRID_ROWS; row++) {
            let gridIndex = colRowToGridIndex(col, row)
            
            switch (grid[gridIndex]) {
                case GRID_WALL:
                    colorRect(col*BLOCK_WIDTH, row*BLOCK_HEIGHT, BLOCK_WIDTH-WALL_MARGIN, BLOCK_HEIGHT-WALL_MARGIN, WALL_COLOR)
                    break
                case GRID_ICE:
                    colorRect(col*BLOCK_WIDTH, row*BLOCK_HEIGHT, BLOCK_WIDTH-WALL_MARGIN, BLOCK_HEIGHT-WALL_MARGIN, ICE_COLOR)
                    break
                case GRID_SPIKES_UP:
                    drawBitmapCenteredWithRotation(col*BLOCK_WIDTH+BLOCK_WIDTH/2, row*BLOCK_HEIGHT+BLOCK_HEIGHT/2, imageMap.spikes, 0)
                    break
                case GRID_SPIKES_DOWN:
                    drawBitmapCenteredWithRotation(col*BLOCK_WIDTH+BLOCK_WIDTH/2, row*BLOCK_HEIGHT+BLOCK_HEIGHT/2, imageMap.spikes, Math.PI)
                    break
                case GRID_SPIKES_LEFT:
                    drawBitmapCenteredWithRotation(col*BLOCK_WIDTH+BLOCK_WIDTH/2, row*BLOCK_HEIGHT+BLOCK_HEIGHT/2, imageMap.spikes, -Math.PI / 2)
                    break
                case GRID_SPIKES_RIGHT:
                    drawBitmapCenteredWithRotation(col*BLOCK_WIDTH+BLOCK_WIDTH/2, row*BLOCK_HEIGHT+BLOCK_HEIGHT/2, imageMap.spikes, Math.PI / 2)
                    break
                case GRID_FUEL:
                    colorRect(col*BLOCK_WIDTH, row*BLOCK_HEIGHT, BLOCK_WIDTH-WALL_MARGIN, BLOCK_HEIGHT-WALL_MARGIN, 'yellow')      
                    break
                case GRID_GOAL:
                    colorRect(col*BLOCK_WIDTH, row*BLOCK_HEIGHT, BLOCK_WIDTH-WALL_MARGIN, BLOCK_HEIGHT-WALL_MARGIN, 'purple')      
                    break
                case GRID_TOWER:
                    colorRect(col*BLOCK_WIDTH, row*BLOCK_HEIGHT, BLOCK_WIDTH-WALL_MARGIN, BLOCK_HEIGHT-WALL_MARGIN, 'brown')      
                    break
                case GRID_MOVING_PLATFORM:
                    colorRect(col*BLOCK_WIDTH, row*BLOCK_HEIGHT, BLOCK_WIDTH-WALL_MARGIN, BLOCK_HEIGHT-WALL_MARGIN, 'green')      
                    break
                case GRID_EMPTY:
                    break
                default:
                    throw "Unknown grid type: " + grid[gridIndex]
            }
        }
    }
}
const PLATFORM_WIDTH = 80 // BLOCK_WIDTH * 4
const PLATFORM_HEIGHT = 18 // BLOCK_HEIGHT - WALL_MARGIN

class MovingPlatform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = PLATFORM_WIDTH
        this.height = PLATFORM_HEIGHT
        this.speedX = 3
    }

    move() {
        // moving left into wall
        if (this.speedX < 0 && isWallAtPixelCoord(this.x - 1, this.y)) {
            this.speedX = -this.speedX
        }
        
        // moving right into wall
        if (this.speedX > 0 && isWallAtPixelCoord(this.x + this.width + 1, this.y)) {
            this.speedX = -this.speedX
        }

        this.x += this.speedX
    }

    draw() {
        colorRect(this.x, this.y, this.width, this.height, "green")
    }
}
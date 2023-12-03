const GRAVITY = 2
const AIR_RESISTANCE = 2
const FRICTION = 0.4
const SPEED_ON_ICE = 8
const RUN_SPEED = 4
const JUMP_POWER = 18
const ANGLE_SPEED = 0.25
const LIFT = -5
const MAX_FUEL = 100

class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 10
        // lives can't be resetted
        this.lives = 3

        this.reset()
    }

    reset() {
        this.speedX = 0
        this.speedY = 0
        this.angleSpeed = 0
        this.angle = 0
        this.dir = 1
        this.fuel = 0
        this.flying = false
        this.onGround = false
    }

    die() {
        this.lives--
            
        if (this.lives === 0) {
            level = 0
            loadLevel()
            this.lives = 3
        } else {
            // load current level
            loadLevel()
        }
    }

    isMovingPlatformAtCoord(x, y) {
        for (let i = 0; i < movingPlatforms.length; i++) {
            let platform = movingPlatforms[i]
            let insideHorizontally = x >= platform.x && x <= platform.x + platform.width
            let insideVertically = y >= platform.y && y <= platform.y + platform.height
        
            if (insideHorizontally && insideVertically) {
              return true
            }
          }
          
        return false
    }

    move() {
        let tileTypeUnderPlayer = getGridTileAtPixelCoord(this.x, this.y + this.radius)
        let standingOnIce = tileTypeUnderPlayer === GRID_ICE

        if (standingOnIce) {
            this.speedX = Math.sign(this.dir) * SPEED_ON_ICE
        } else {
            this.speedX = 0
        }

        this.angleSpeed = 0
        this.flying = false
        this.onGround = isWallAtPixelCoord(this.x, this.y + this.radius) ||
                        this.isMovingPlatformAtCoord(this.x, this.y + this.radius)
        
        if (this.onGround) {
            this.speedX *= FRICTION    
        } else {
            this.speedX *= AIR_RESISTANCE
            this.speedY += GRAVITY
            
            // cheap test to ensure can't fall through floor
            if(this.speedY > this.radius) {
                this.speedY = this.radius;
            }
        }

        if (holdLeft) {
            this.speedX = standingOnIce ? -SPEED_ON_ICE : -RUN_SPEED
            this.angleSpeed = -ANGLE_SPEED
            this.dir = -1
        }
        if (holdRight) {
            this.speedX = standingOnIce ? +SPEED_ON_ICE : +RUN_SPEED
            this.angleSpeed = +ANGLE_SPEED
            this.dir = 1
        }
        if (holdSpace && this.fuel > 0) {
            this.speedX = LIFT * Math.cos(this.angle)
            this.speedY = LIFT * Math.sin(this.angle)
            this.flying = true
            // with full gas tank you can fly for 5 seconds
            // so in one second you lose MAX_FUEL/5 units of gas
            // in one second is shown 30 frames
            // so in one frame you lose 20/30 = 2/3 units of gas
            this.fuel = Math.max(0, this.fuel - 2/3)
        }
        
        // TODO: handle collisions with moving objects like GRID_MOVING_PLATFORM
        // moving down into wall
        if (this.speedY > 0 && 
            (isWallAtPixelCoord(this.x, this.y + this.radius) ||
            this.isMovingPlatformAtCoord(this.x, this.y + this.radius))) {
            this.y = (1+Math.floor( this.y / BLOCK_HEIGHT )) * BLOCK_HEIGHT - this.radius
            this.speedY = 0
        }
        
        // moving up into wall
        if (this.speedY < 0 && 
            (isWallAtPixelCoord(this.x, this.y - this.radius) ||
            this.isMovingPlatformAtCoord(this.x, this.y - this.radius))) {
            // TODO: hitting hit into wall bugs a little now, player burrows into it
            //this.y = (Math.floor( this.y / BLOCK_HEIGHT )) * BLOCK_HEIGHT + this.radius
            this.speedY = 0
        }
        
        // moving left into wall
        if (this.speedX < 0 && 
            (isWallAtPixelCoord(this.x - this.radius, this.y) ||
            this.isMovingPlatformAtCoord(this.x - this.radius, this.y))) {
            this.speedX = 0
        }
        
        // moving right into wall
        if (this.speedX > 0 && 
            (isWallAtPixelCoord(this.x + this.radius, this.y) ||
            this.isMovingPlatformAtCoord(this.x + this.radius, this.y))) {
            this.speedX = 0
        }

        let playerPosTile = getGridTileAtPixelCoord(this.x, this.y)

        if (playerPosTile === GRID_FUEL) {
            let playerArrayIndex = pixelCoordToArrayIndex(this.x, this.y)
            grid[playerArrayIndex] = GRID_EMPTY
            this.fuel = Math.min(this.fuel + 25, 100)
        }

        if (playerPosTile === GRID_OUT_OF_BOUNDS || isEnemyTile(playerPosTile)) {
            this.die()
        }

        if (playerPosTile === GRID_GOAL) {
            if (level === levels.length - 1) {
                gameOver = true
            } else {
                level++
                loadLevel()
            }
        }
        
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.angleSpeed
    }

    draw() {
        let whichImage = this.flying ? imageMap.playerFlying : imageMap.playerDefault
        drawBitmapCenteredWithRotation(this.x, this.y, whichImage, this.angle)
    }
}
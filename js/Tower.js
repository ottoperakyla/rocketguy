const SHOT_SPEED = 2

class Tower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.shotActive = false
        this.shot = null
    }

    playerIsCloseToTower() {
        return distance(this, player) < 12*BLOCK_WIDTH
    }

    move() {
        let [playerCol, playerRow] = pixelCoordToColRow(player.x, player.y)
        let [towerCol, towerRow] = pixelCoordToColRow(this.x, this.y)
        
        // TODO:
        // get direction of shot first
        // then check if tower can shoot there
        if (this.playerIsCloseToTower() && !this.shot) {
            let shotLifeTimeInFrames = 2 * fps

            if (playerRow === towerRow) {
                let shotSpeedX = playerCol < towerCol ? -SHOT_SPEED : +SHOT_SPEED
                let shotSpeedY = 0

                this.shot = {
                    x: this.x, 
                    y: this.y, 
                    speedX: shotSpeedX, 
                    speedY: shotSpeedY, 
                    lifeTime: shotLifeTimeInFrames
                }
            }
            else if (playerCol === towerCol) {
                let shotSpeedX = 0
                let shotSpeedY = playerRow < towerRow ? -SHOT_SPEED : +SHOT_SPEED 

                this.shot = {
                    x: this.x, 
                    y: this.y, 
                    speedX: shotSpeedX, 
                    speedY: shotSpeedY, 
                    lifeTime: shotLifeTimeInFrames
                }
            }    
        } else if (this.shot) {
            let shotPosTile = getGridTileAtPixelCoord(this.shot.x, this.shot.y)
            let playerArrayIndex = pixelCoordToArrayIndex(player.x, player.y)
            let shotArrayIndex = pixelCoordToArrayIndex(this.shot.x, this.shot.y)
    
            this.shot.x += this.shot.speedX
            this.shot.y += this.shot.speedY

            this.shot.lifeTime--
    
            colorCircle(this.shot.x, this.shot.y, 2.5, "white")

            if (playerArrayIndex === shotArrayIndex) {
                player.die()
            }
    
            if (shotPosTile === GRID_WALL || this.shot.lifeTime <= 0) {
                this.shot = null
            }
        }
    }
}
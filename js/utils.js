function distance(a, b) {
  return Math.sqrt( Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) )
}

function pixelCoordToColRow(x, y) {
  let col = Math.floor( x / BLOCK_WIDTH )
  let row = Math.floor( y / BLOCK_HEIGHT )

  return [col, row]
}

function colRowToGridIndex(col, row) {
    return row * GRID_COLS + col
}

function pixelCoordToArrayIndex(x, y) {
  let [col, row] = pixelCoordToColRow(x, y)
  return colRowToGridIndex(col, row)
}

function getGridTileAtPixelCoord(x, y) {
  let [col, row] = pixelCoordToColRow(x, y)
  
  if (col < 0 || col >= GRID_COLS ||
      row < 0 || row >= GRID_ROWS) {
          return GRID_OUT_OF_BOUNDS
      }
      
  let gridIndex = colRowToGridIndex(col, row)
  return grid[gridIndex]
}

function isWallAtPixelCoord(x, y) {
  let tileType = getGridTileAtPixelCoord(x, y)
  
  return [
    GRID_WALL, 
    GRID_ICE
  ].includes(tileType)
}

function isSpikeTile(tileType) {
  return [
    GRID_SPIKES_DOWN, 
    GRID_SPIKES_LEFT, 
    GRID_SPIKES_RIGHT, 
    GRID_SPIKES_UP
  ].includes(tileType)
}

function isTowerTile(tileType) {
  return tileType === GRID_TOWER
}

function isEnemyTile(tileType) {
  return isSpikeTile(tileType) || isTowerTile(tileType)
}

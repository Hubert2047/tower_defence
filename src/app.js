import { resetCanvas } from './context2D.js'
import currentEnemies from './data/enemies.js'
import { createPlacementTiles, createTower, updateEnemy, updatePlacementTile, updateTowers } from './helper/index.js'
const placementTiles = createPlacementTiles()
const towers = []
let activeTile = null
const mouse = { x: undefined, y: undefined }
function startGame() {
    resetCanvas()
    updateEnemy(currentEnemies)
    updatePlacementTile({ placementTiles, mouse })
    updateTowers({ towers })
    requestAnimationFrame(startGame)
}
startGame()
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    activeTile = placementTiles.find((tile) => tile.hasCollisionWithMouse(mouse)) ?? null
})
window.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied) {
        activeTile.isOccupied = true
        towers.push(createTower(activeTile.position))
    }
})

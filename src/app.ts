import PlacementTile from './classes/PlacementTile.js'
import Tower from './classes/Tower.js'
import { resetCanvas } from './context2D/index.js'
import currentEnemies from './data/enemies.js'
import { createPlacementTiles, createTower, updateEnemy, updatePlacementTile, updateTowers } from './helper/index.js'
import { position } from './interface/index.js'
const placementTiles: PlacementTile[] = createPlacementTiles()
const towers: Tower[] = []
let activeTile: PlacementTile | null = null
const mouse: position = { x: 0, y: 0 }
function startGame(): void {
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

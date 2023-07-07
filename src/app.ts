import PlacementTile from './classes/PlacementTile.js'
import Tower from './classes/Tower.js'
import { resetCanvas } from './context2D/index.js'
import { updateEnemies } from './data/enemies.js'
import { createPlacementTiles, createTower, updatePlacementTiles, updateTowers } from './helper/index.js'
import { position } from './types/index.js'
const placementTiles: PlacementTile[] = createPlacementTiles()
const towers: Tower[] = []
let activeTile: PlacementTile | null = null
const mouse: position = { x: 0, y: 0 }
function startGame(): void {
    resetCanvas()
    updateEnemies()
    updatePlacementTiles({ placementTiles, mouse })
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
        console.log('active', activeTile.position)
        towers.push(createTower(activeTile.position))
    }
})

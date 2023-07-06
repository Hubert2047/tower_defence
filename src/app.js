import { resetCanvas } from './context2D.js'
import {
    createEnemies,
    createPlacementTiles,
    createTower,
    updateEnemy,
    updatePlacementTile,
    updateTowers,
} from './helper/index.js'

const enemies = createEnemies({ count: 10 })
const placementTiles = createPlacementTiles()
const towers = []
let activeTile = null
const mouse = { x: undefined, y: undefined }
function startGame() {
    resetCanvas()
    updateEnemy(enemies)
    updatePlacementTile({ placementTiles, mouse })
    updateTowers(towers)
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

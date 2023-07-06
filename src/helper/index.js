import Enemy from '../classes/enemy.js'
import PlacementTile from '../classes/placementTile.js'
import Tower from '../classes/tower.js'
import { TILE_SIZE } from '../constants/index.js'
import c from '../context2D.js'
import { placementTiles2D } from '../data/index.js'

function calculateDistanceTwoPoint(pointA, pointB) {
    const dx = pointA.x - pointB.x
    const dy = pointA.y - pointB.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance
}
function getVectorNomalized(startPointLocation, endPointLocation) {
    const v = {
        x: endPointLocation.x - startPointLocation.x,
        y: endPointLocation.y - startPointLocation.y,
    }
    const v_normalized = {
        x: v.x / Math.sqrt(v.x * v.x + v.y * v.y),
        y: v.y / Math.sqrt(v.x * v.x + v.y * v.y),
    }
    return v_normalized
}
function createBackground() {
    const image = new Image()
    image.src = 'src/assets/images/gameMap.png'
    c.drawImage(image, 0, 0)
}
function createEnemies({ count }) {
    const enemies = []
    for (let i = 0; i < count; i++) {
        const offsetX = i * 100
        enemies.push(new Enemy({ position: { x: -10 - offsetX, y: 484 }, moveSpeed: 3 }))
    }
    return enemies
}
function createPlacementTiles() {
    const placementTiles = []
    placementTiles2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 14) {
                placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }))
            }
        })
    })
    return placementTiles
}
function createTower(position) {
    return new Tower({ position: position })
}
function updateEnemy(enemies) {
    enemies.forEach((enemy) => {
        enemy.update()
    })
}
function updatePlacementTile({ placementTiles, mouse }) {
    placementTiles.forEach((placementTile) => {
        placementTile.update(mouse)
    })
}
function updateTowers({ towers }) {
    towers.forEach((tower) => {
        tower.update()
    })
}
export {
    createBackground,
    getVectorNomalized,
    updateEnemy,
    updatePlacementTile,
    createEnemies,
    createPlacementTiles,
    createTower,
    updateTowers,
    calculateDistanceTwoPoint,
}

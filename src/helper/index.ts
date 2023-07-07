import Enemy from '../classes/Enemy.js'
import PlacementTile from '../classes/PlacementTile.js'
import Tower from '../classes/Tower.js'
import { TILE_SIZE } from '../constants/index.js'
import context2D from '../context2D/index.js'
import { placementTiles2D } from '../data/index.js'
import { position } from '../types/index.js'

function calculateDistanceTwoPoint(pointA: position, pointB: position): number {
    const dx: number = pointA.x - pointB.x
    const dy: number = pointA.y - pointB.y
    const distance: number = Math.sqrt(dx * dx + dy * dy)
    return distance
}
function getVectorNomalized(startPointLocation: position, endPointLocation: position): position {
    const v: position = {
        x: endPointLocation.x - startPointLocation.x,
        y: endPointLocation.y - startPointLocation.y,
    }
    const v_normalized: position = {
        x: v.x / Math.sqrt(v.x * v.x + v.y * v.y),
        y: v.y / Math.sqrt(v.x * v.x + v.y * v.y),
    }
    return v_normalized
}
function createBackground(): void {
    const image: HTMLImageElement = new Image()
    image.src = '../../public/src/assets/images/gameMap.png'
    if (context2D) context2D.drawImage(image, 0, 0)
}
function createEnemies({ count }: { count: number }): Enemy[] {
    const enemies: Enemy[] = []
    for (let i = 0; i < count; i++) {
        const offsetX: number = i * 100
        enemies.push(new Enemy({ position: { x: -10 - offsetX, y: 484 }, moveSpeed: 3 }))
    }
    return enemies
}
function createPlacementTiles(): PlacementTile[] {
    const placementTiles: PlacementTile[] = []
    placementTiles2D.forEach((row: number[], y: number) => {
        row.forEach((symbol: number, x: number) => {
            if (symbol === 14) {
                placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }))
            }
        })
    })
    return placementTiles
}
function createTower(position: position): Tower {
    return new Tower({ position: position })
}

function updatePlacementTiles({ placementTiles, mouse }: { placementTiles: PlacementTile[]; mouse: position }): void {
    placementTiles.forEach((placementTile) => {
        placementTile.update(mouse)
    })
}
function updateTowers({ towers }: { towers: Tower[] }): void {
    towers.forEach((tower: Tower) => {
        tower.update()
    })
}
export {
    calculateDistanceTwoPoint,
    createBackground,
    createEnemies,
    createPlacementTiles,
    createTower,
    getVectorNomalized,
    updatePlacementTiles,
    updateTowers,
}

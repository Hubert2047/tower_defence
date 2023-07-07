import PlacementTile from '../classes/PlacementTile.js'
import BloodMoon from '../classes/Towers/BloodMoon.tower.js'
import Tower from '../classes/Towers/index.js'
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
function createImageSources(sources: string[]): HTMLImageElement[] {
    const imageSources: HTMLImageElement[] = []
    sources.forEach((src) => {
        const image = new Image()
        image.src = src
        imageSources.push(image)
    })
    return imageSources
}
function getAngleFromPointAToPointB(pointA: position, pointB: position): number {
    const dx: number = pointB.x - pointA.x
    const dy: number = pointB.y - pointA.y
    const angleRad: number = Math.atan2(dy, dx)
    const angleDeg: number = angleRad * (180 / Math.PI)
    return angleDeg
}
function createBackground(): void {
    const image: HTMLImageElement = new Image()
    image.src = '../../public/src/assets/images/gameMap.png'
    if (context2D) context2D.drawImage(image, 0, 0)
}
// function createEnemies({ count, moveSpeed }: { count: number; moveSpeed?: number }): Enemy[] {
//     const enemies: Enemy[] = []
//     for (let i = 0; i < count; i++) {
//         const offsetX: number = i * 100
//         enemies.push(new Enemy({ position: { x: -10 - offsetX, y: 484 }, moveSpeed }))
//     }
//     return enemies
// }
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
    return new BloodMoon({ position: position })
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
    // createEnemies,
    createImageSources,
    createPlacementTiles,
    createTower,
    getAngleFromPointAToPointB,
    getVectorNomalized,
    updatePlacementTiles,
    updateTowers,
}

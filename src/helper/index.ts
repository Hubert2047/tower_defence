import { BASE_HEALTH } from '../constants/index.js'
import context2D from '../context2D/index.js'
import gameData from '../data/index.js'
import { E_gameMap } from '../enum/index.js'
import { T_gameMapData, T_position } from '../types/index.js'
function calculateDistanceTwoPoint(pointA: T_position, pointB: T_position): number {
    const dx: number = pointA.x - pointB.x
    const dy: number = pointA.y - pointB.y
    const distance: number = Math.sqrt(dx * dx + dy * dy)
    return distance
}
function calFullHealthWidth(health: number): number {
    const width = (health * 15) / BASE_HEALTH
    return width > 120 ? 120 : width
}
function calculateHoldTime({ maxX, maxY, moveSpeed }: { maxX: number; maxY: number; moveSpeed: number }): number {
    const holdTime = parseInt(((maxX * maxY) / 2 / moveSpeed).toString())
    return holdTime <= 0 ? 1 : holdTime
}
function calAngleFromPointAToPointB(pointA: T_position, pointB: T_position): number {
    const dx: number = pointB.x - pointA.x
    const dy: number = pointB.y - pointA.y
    const angleRad: number = Math.atan2(dy, dx)
    const angleDeg: number = angleRad * (180 / Math.PI)
    return angleDeg
}
function getVectorNomalized(startPointLocation: T_position, endPointLocation: T_position): T_position {
    const v: T_position = {
        x: endPointLocation.x - startPointLocation.x,
        y: endPointLocation.y - startPointLocation.y,
    }
    const v_normalized: T_position = {
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
function createBackground({ backgroundImage }: { backgroundImage: HTMLImageElement }): void {
    if (context2D) context2D.drawImage(backgroundImage, 0, 0)
}
function getGameMapData(gameMapType: E_gameMap): T_gameMapData | undefined {
    const data: T_gameMapData | undefined = gameData.get(gameMapType)
    if (data) {
        return {
            rounds: deepClone(data.rounds),
            placementTiles2D: deepClone(data.placementTiles2D),
            backgoundImage: data.backgoundImage,
            waypoints: deepClone(data.waypoints),
            limitAttacks: data.limitAttacks,
            startCoins: data.startCoins,
        }
    }
    return undefined
}
function deepClone(data: any) {
    if (typeof data !== 'object' || data === null) {
        return data
    }
    const clone: any = Array.isArray(data) ? [] : {}
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            clone[key] = deepClone(data[key])
        }
    }
    return clone
}
function randomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
}
export {
    calAngleFromPointAToPointB,
    calFullHealthWidth,
    calculateDistanceTwoPoint,
    calculateHoldTime,
    createBackground,
    createImageSources,
    deepClone,
    getGameMapData,
    getVectorNomalized,
    randomNumberInRange,
}

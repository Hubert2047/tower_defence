import { BASE_HEALTH } from '../constants/index.js'
import gameData from '../data/gameMaps/index.js'
import { E_gameMap } from '../enum/index.js'
import { T_frame, T_gameMapData, T_initFrame, T_initFramesDictionary, T_position } from '../types/index.js'
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
function createImage(sourceString: string): HTMLImageElement {
    const image: HTMLImageElement = new Image()
    image.src = sourceString
    return image
}
function createFrames({
    initFrames,
    moveSpeed,
}: {
    initFrames: T_initFramesDictionary
    moveSpeed?: number
}): Map<string, Map<string, T_frame>> {
    const frames: Map<string, Map<string, T_frame>> = new Map()
    const behaviorKeys: string[] = Object.keys(initFrames)
    for (let behaviorKey of behaviorKeys) {
        const angelKeys: string[] = Object.keys(initFrames[behaviorKey])
        const currentFrame: Map<string, T_frame> = new Map()
        for (let angelKey of angelKeys) {
            const currentInitFrame: T_initFrame = initFrames[behaviorKey][angelKey]
            const image: HTMLImageElement = createImage(currentInitFrame.imageSourceString)
            const maxX: number = currentInitFrame.maxX
            const maxY: number = currentInitFrame.maxY
            const holdTime: number = moveSpeed
                ? calculateHoldTime({ maxX, maxY, moveSpeed })
                : currentInitFrame.holdTime
            currentFrame.set(angelKey, { image, maxX, maxY, holdTime })
        }
        frames.set(behaviorKey, currentFrame)
    }

    return frames
}
function getGameMapData(gameMapType: E_gameMap): T_gameMapData | undefined {
    const data: T_gameMapData | undefined = gameData.get(gameMapType)
    if (data) {
        return {
            rounds: deepClone(data.rounds),
            placementTiles2D: deepClone(data.placementTiles2D),
            backgroundImage: data.backgroundImage,
            waypoints: deepClone(data.waypoints),
            limitAttacks: data.limitAttacks,
            startCoins: data.startCoins,
        }
    }
    return undefined
}
function deepClone(data: any): any {
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
    createFrames,
    createImage,
    deepClone,
    getGameMapData,
    getVectorNomalized,
    randomNumberInRange,
}

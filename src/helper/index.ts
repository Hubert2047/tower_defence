import Sprite from '../classes/sprite/index.js'
import { BASE_HEALTH } from '../constants/index.js'
import context2D from '../context2D/index.js'
import gameData from '../data/gameMaps/index.js'
import { E_angels, E_gameMap } from '../enum/index.js'
import { T_frame, T_gameMapData, T_initFrame, T_initFramesDictionary, T_position } from '../types/index.js'

function calculateDistanceTwoPoint(pointA: T_position, pointB: T_position): number {
    const dx: number = pointA.x - pointB.x
    const dy: number = pointA.y - pointB.y
    const distance: number = Math.sqrt(dx * dx + dy * dy)
    return distance
}
function calFullHealthWidth(health: number): number {
    const width = (health * 6) / BASE_HEALTH
    return width > 80 ? 80 : width
}
function calculateHoldTime({ maxX, maxY, moveSpeed }: { maxX: number; maxY: number; moveSpeed: number }): number {
    const holdTime = parseInt(((maxX * maxY) / 2 / moveSpeed).toString())
    return holdTime <= 1 ? 1 : holdTime
}
function updateHealthBars({ sprite, health, remainHealth }: { sprite: Sprite; health: number; remainHealth: number }) {
    const drawOption = {
        lineWidth: 2,
        height: 7,
        borderRadius: 4,
        strokeStyle: 'white',
    }
    const fullHealthWidth = calFullHealthWidth(health)
    const remainHealthWidth = (remainHealth * fullHealthWidth) / health
    drawHealthBarFull({ sprite, drawOption, fullHealthWidth, remainHealth, fillStyle: 'red' })
    if (fullHealthWidth === remainHealthWidth) {
        drawHealthBarFull({ sprite, drawOption, remainHealth, fullHealthWidth, fillStyle: 'green' })
    } else {
        drawRemainHealthBar({ sprite, drawOption, fullHealthWidth, remainHealthWidth, fillStyle: 'green' })
    }
}
interface healthBarOptions {
    lineWidth: number
    height: number
    borderRadius: number
    strokeStyle: string
}
function drawRemainHealthBar({
    sprite,
    remainHealthWidth,
    fullHealthWidth,
    drawOption,
    fillStyle,
}: {
    sprite: Sprite
    drawOption: healthBarOptions
    remainHealthWidth: number
    fullHealthWidth: number
    fillStyle: string
}) {
    if (context2D) {
        const center = (sprite.width - 2 * sprite.offset.x - fullHealthWidth) / 2
        const x = sprite.position.x + center
        const y = sprite.position.y - sprite.height + 2 * sprite.offset.y
        // start draw
        context2D.beginPath()
        // draw top
        context2D.moveTo(x + drawOption.borderRadius, y)
        context2D.lineTo(x + remainHealthWidth, y)
        context2D.arcTo(
            x + remainHealthWidth,
            y,
            x + remainHealthWidth,
            y + drawOption.borderRadius,
            drawOption.borderRadius
        )
        // draw right
        context2D.lineTo(x + remainHealthWidth, y + drawOption.height)
        // draw bottom
        context2D.arcTo(
            x + remainHealthWidth,
            y + drawOption.height,
            x + remainHealthWidth - drawOption.borderRadius,
            y + drawOption.height,
            drawOption.borderRadius
        )
        context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height)
        // draw left border radius
        context2D.arcTo(x, y + drawOption.height, x, y + drawOption.borderRadius, drawOption.borderRadius)
        context2D.lineTo(x, y + drawOption.borderRadius)
        // draw left border radius
        context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius)

        context2D.closePath()
        context2D.strokeStyle = drawOption.strokeStyle
        context2D.fillStyle = fillStyle
        context2D.lineWidth = drawOption.lineWidth
        context2D.stroke()
        context2D.fill()
    }
}
function drawHealthBarFull({
    sprite,
    remainHealth,
    fullHealthWidth,
    drawOption,
    fillStyle,
}: {
    sprite: Sprite
    drawOption: healthBarOptions
    fullHealthWidth: number
    remainHealth: number
    fillStyle: string
}) {
    if (context2D) {
        const center = (sprite.width - 2 * sprite.offset.x - fullHealthWidth) / 2
        const x = sprite.position.x + center
        const y = sprite.position.y - sprite.height + 2 * sprite.offset.y
        context2D.beginPath()

        // draw top rectangle
        context2D.moveTo(x + drawOption.borderRadius, y)
        context2D.lineTo(x + fullHealthWidth - drawOption.borderRadius, y)
        context2D.arcTo(
            x + fullHealthWidth,
            y,
            x + fullHealthWidth,
            y + drawOption.borderRadius,
            drawOption.borderRadius
        )

        // draw right rectangle
        context2D.lineTo(x + fullHealthWidth, y + drawOption.height - drawOption.borderRadius)
        context2D.arcTo(
            x + fullHealthWidth,
            y + drawOption.height,
            x + fullHealthWidth - drawOption.borderRadius,
            y + drawOption.height,
            drawOption.borderRadius
        )

        // draw bottom rectangle
        context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height)
        context2D.arcTo(
            x,
            y + drawOption.height,
            x,
            y + drawOption.height - drawOption.borderRadius,
            drawOption.borderRadius
        )

        // draw left rectangle
        context2D.lineTo(x, y + drawOption.borderRadius)
        context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius)

        // end draw
        context2D.closePath()
        // draw stroke and color
        context2D.strokeStyle = drawOption.strokeStyle
        context2D.fillStyle = fillStyle
        context2D.lineWidth = drawOption.lineWidth
        context2D.stroke()
        context2D.fill()
        drawHealthText({ x, y }, fullHealthWidth, remainHealth)
    }
}
function drawHealthText(position: T_position, fullHealthWidth: number, remainHealth: number) {
    if (context2D) {
        context2D.font = '16px Arial'
        context2D.fillStyle = 'white'
        const remainHealthString = remainHealth.toString()
        const textWidth = context2D.measureText(remainHealthString).width
        context2D.fillText(remainHealthString, position.x + fullHealthWidth / 2 - textWidth / 2, position.y - 8)
    }
}
function calAngleFromPointAToPointB(pointA: T_position, pointB: T_position): number {
    const pointC: T_position = { x: pointA.x, y: 0 } // 0degree
    const vectorAC: T_position = { x: pointC.x - pointA.x, y: pointC.y - pointA.y }
    const vectorAB: T_position = { x: pointB.x - pointA.x, y: pointB.y - pointA.y }
    const angleRad: number = Math.atan2(vectorAB.y, vectorAB.x) - Math.atan2(vectorAC.y, vectorAC.x)
    const angleDeg: number = angleRad * (180 / Math.PI)
    return angleDeg
}
function getAngleKeyByTwoPoint(pointA: T_position, pointB: T_position): E_angels {
    const angel = Math.abs(calAngleFromPointAToPointB(pointA, pointB))
    if ((angel >= 0 && angel <= 22.5) || angel >= 337.5) {
        return E_angels.ANGEL_0
    }
    if (angel >= 22.5 && angel < 67.5) {
        return E_angels.ANGEL_45
    }
    if (angel >= 67.5 && angel < 112.5) {
        return E_angels.ANGEL_90
    }
    if (angel >= 112.5 && angel < 157.5) {
        return E_angels.ANGEL_135
    }
    if (angel >= 157.5 && angel < 202.5) {
        return E_angels.ANGEL_180
    }
    if (angel >= 202.5 && angel < 247.5) {
        return E_angels.ANGEL_225
    }
    if (angel >= 247.5 && angel < 292.5) {
        return E_angels.ANGEL_270
    }
    if (angel >= 292.5 && angel < 337.5) {
        return E_angels.ANGEL_315
    }
    return E_angels.ANGEL_0
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
// function updateMap(data, startRow, startCol, numCol, numRow) {
//     for (var i = startRow; i < startRow + numRow; i++) {
//         if (!data[i]) {
//             data[i] = []
//         }
//         for (var j = startCol; j < startCol + numCol; j++) {
//             data[i][j] = 1
//         }
//     }
// }
// function findBuildablePositions(map, numcol, numRow) {
//     var buildablePositions = []

//     for (var i = 0; i <= map.length - numRow; i++) {
//         for (var j = 0; j <= map[i].length - numcol; j++) {
//             var isBuildable = true

//             for (var k = i; k < i + numRow; k++) {
//                 for (var l = j; l < j + numcol; l++) {
//                     if (map[k][l] !== 0) {
//                         isBuildable = false
//                         break
//                     }
//                 }
//                 if (!isBuildable) {
//                     break
//                 }
//             }

//             if (isBuildable) {
//                 buildablePositions.push([j, i])
//             }
//         }
//     }

//     return buildablePositions
// }
function getGameMapData(gameMapType: E_gameMap): T_gameMapData | undefined {
    const data: T_gameMapData | undefined = gameData.get(gameMapType)
    if (data) {
        return {
            rounds: deepClone(data.rounds),
            placementTiles2D: deepClone(data.placementTiles2D),
            backgroundImage: data.backgroundImage,
            waypoints: deepClone(data.waypoints),
            startCoins: data.startCoins,
            initDashboardTowerInfo: deepClone(data.initDashboardTowerInfo),
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
    getAngleKeyByTwoPoint,
    getGameMapData,
    getVectorNomalized,
    randomNumberInRange,
    updateHealthBars,
}

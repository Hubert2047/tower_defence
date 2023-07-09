import { E_enemy } from '../../enum/index.js'
import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js'
import { T_enemy, T_frame } from '../../types/index'
import { T_enemiesDefaultProperty } from '../../types/index.js'
import defaultProperty from '../enemies/enemies.default.property.js'
import Enemy from './index.js'
export default class Siren extends Enemy {
    constructor({ position = { x: 0, y: 0 }, moveSpeed = 1, health = 8000, coins = 2 }: T_enemy) {
        const sources = [
            '../../public/src/assets/images/enemies/Siren/top_0.png',
            '../../public/src/assets/images/enemies/Siren/left_290.png',
            '../../public/src/assets/images/enemies/Siren/right_90.png',
            '../../public/src/assets/images/enemies/Siren/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const property: T_enemiesDefaultProperty = deepClone(defaultProperty.get(E_enemy.SIREN))
        const { enemyType, offset, maxX, maxY, height, width } = property
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
        const frame: T_frame = { maxX, maxY, holdTime }
        super({ enemyType, position, width, height, offset, imageSources, frame, moveSpeed, health, coins })
    }
}

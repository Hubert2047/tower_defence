import { E_enemyType } from '../../enum/index.js'
import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js'
import { T_enemiesDefaultProperty, T_frame, T_position } from '../../types/index.js'
import defaultProperty from '../enemies/enemies.default.property.js'
import Enemy from './index.js'

export default class Dragon extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        const sources = [
            '../../public/src/assets/images/enemies/Dragon/top_0.png',
            '../../public/src/assets/images/enemies/Dragon/left_290.png',
            '../../public/src/assets/images/enemies/Dragon/right_90.png',
            '../../public/src/assets/images/enemies/Dragon/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const property: T_enemiesDefaultProperty = deepClone(defaultProperty.get(E_enemyType.DRAGON))
        const { offset, maxX, maxY, moveSpeed, coins, HP, width, height } = property
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
        const frame: T_frame = { maxX, maxY, holdTime }
        super({ position, width, height, offset, imageSources, frame, moveSpeed, HP, coins })
    }
}

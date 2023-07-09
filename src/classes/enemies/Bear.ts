import { E_enemyType } from '../../enum/index.js'
import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js'
import { T_enemiesDefaultProperty, T_frame, T_position } from '../../types/index.js'
import defaultProperty from '../enemies/enemies.default.property.js'
import Enemy from './index.js'
export default class Bear extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        const sources = [
            '../../public/src/assets/images/enemies/Bear/top_0.png',
            '../../public/src/assets/images/enemies/Bear/left_290.png',
            '../../public/src/assets/images/enemies/Bear/right_90.png',
            '../../public/src/assets/images/enemies/Bear/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const property: T_enemiesDefaultProperty = deepClone(defaultProperty.get(E_enemyType.BEAR))
        const { offset, maxX, maxY, moveSpeed, coins, HP } = property
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
        const frame: T_frame = { maxX, maxY, holdTime }

        super({ position, offset, imageSources, frame, moveSpeed, HP, coins })
    }
}

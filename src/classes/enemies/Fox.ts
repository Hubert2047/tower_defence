import { calculateHoldTime, createImageSources } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index'
import Enemy from './index.js'

export default class Fox extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        const sources = [
            '../../public/src/assets/images/Fox/top_0.png',
            '../../public/src/assets/images/Fox/left_290.png',
            '../../public/src/assets/images/Fox/right_90.png',
            '../../public/src/assets/images/Fox/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const offset = { x: 65, y: 65 }
        const maxX = 4
        const maxY = 4
        const moveSpeed = 5
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
        const frame: T_frame = { maxX, maxY, holdTime }
        const HP = 1000

        super({ position, offset, imageSources, frame, moveSpeed, HP })
    }
}

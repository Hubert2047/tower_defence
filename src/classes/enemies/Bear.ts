import { calculateHoldTime, createImageSources } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Enemy from './index.js'

export default class Bear extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        const sources = [
            '../../public/src/assets/images/Bear/top_0.png',
            '../../public/src/assets/images/Bear/left_290.png',
            '../../public/src/assets/images/Bear/right_90.png',
            '../../public/src/assets/images/Bear/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const offset = { x: 65, y: 65 }
        const maxX = 4
        const maxY = 5
        const moveSpeed = 4
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
        const frame: T_frame = { maxX, maxY, holdTime }
        const HP = 5000
        super({ position, offset, imageSources, frame, moveSpeed, HP })
    }
}

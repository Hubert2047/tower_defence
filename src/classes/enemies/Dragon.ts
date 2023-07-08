import { calculateHoldTime, createImageSources } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Enemy from './index.js'

export default class Dragon extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        const sources = [
            '../../public/src/assets/images/Dragon/top_0.png',
            '../../public/src/assets/images/Dragon/left_290.png',
            '../../public/src/assets/images/Dragon/right_90.png',
            '../../public/src/assets/images/Dragon/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const offset = { x: 65, y: 65 }
        const maxX = 4
        const maxY = 4
        const moveSpeed = 5
        const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
        const frame: T_frame = { maxX, maxY, holdTime }
        const HP = 5000
        super({ position, offset, imageSources, frame, moveSpeed, HP })
    }
}

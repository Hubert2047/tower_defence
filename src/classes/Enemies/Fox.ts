import { createImageSources } from '../../helper/index.js'
import { position } from '../../types/index'
import Enemy from './index.js'

export default class Fox extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: position }) {
        const sources = [
            '../../public/src/assets/images/Fox/top_0.png',
            '../../public/src/assets/images/Fox/left_290.png',
            '../../public/src/assets/images/Fox/right_90.png',
            '../../public/src/assets/images/Fox/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        super({
            position,
            imageSources,
            frameMaxX: 4,
            frameMaxY: 4,
            moveSpeed: 8,
            HP: 5000000,
            offset: { x: 65, y: 65 },
        })
    }
}

import { createImageSources } from '../../helper/index.js'
import { position } from '../../types/index'
import Enemy from './index.js'

export default class Bear extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: position }) {
        const sources = [
            '../../public/src/assets/images/Bear/top_0.png',
            '../../public/src/assets/images/Bear/left_290.png',
            '../../public/src/assets/images/Bear/right_90.png',
            '../../public/src/assets/images/Bear/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        super({ position, imageSources, frameMaxX: 4, frameMaxY: 5, moveSpeed: 5, offset: { x: 65, y: 65 } })
    }
}

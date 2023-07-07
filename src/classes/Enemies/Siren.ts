import { createImageSources } from '../../helper/index.js'
import { position } from '../../types/index'
import Enemy from './index.js'

export default class Siren extends Enemy {
    constructor({ position = { x: 0, y: 0 } }: { position: position }) {
        const sources = [
            '../../public/src/assets/images/Siren/top_0.png',
            '../../public/src/assets/images/Siren/left_290.png',
            '../../public/src/assets/images/Siren/right_90.png',
            '../../public/src/assets/images/Siren/bottom_180.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        super({ position, imageSources, frameMaxX: 5, frameMaxY: 4, moveSpeed: 5, offset: { x: 65, y: 65 } })
    }
}

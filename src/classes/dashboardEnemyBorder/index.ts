import { createImageSources } from '../../helper/index.js'
import { T_dashboardEnemyBorder } from '../../types/index.js'
import Sprite from '../sprite/index.js'
export default class Border extends Sprite {
    name: string
    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        imageSourceString,
        frame,
        width = 64,
        height = 64,
    }: T_dashboardEnemyBorder) {
        const imageSources: HTMLImageElement[] = createImageSources(imageSourceString)
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            frame,
        })
        this.name = name
    }
    update(): void {
        this.draw({ sourceIndex: 0 })
    }
}

import { E_angels, E_behaviors } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_dashboardEnemyBorder, T_frame } from '../../types/index.js'
import Sprite from '../sprite/index.js'
export default class Border extends Sprite {
    name: string
    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        initFrames,
        width = 64,
        height = 64,
    }: T_dashboardEnemyBorder) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({
            position,
            offset,
            width,
            height,
            frames,
        })
        this.name = name
    }
    update(): void {
        this.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    }
}

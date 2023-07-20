import { E_angels, E_behaviors } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_towerLevelUp = {
    position: T_position
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
export default class TowerLevelUp extends Sprite {
    behaviorKey: E_behaviors
    angelKey: E_angels
    col: number
    row: number
    constructor({ position, angelKey = E_angels.ANGEL_0, behaviorKey = E_behaviors.IDLE }: T_towerLevelUp) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/menu/tower_level_up_menu.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const col = 12
        const row = 8
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width: 64 * col, height: 64 * row, opacity: 0.99 })
        this.col = col
        this.row = row
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public hasCollision(position: T_position): boolean {
        return (
            this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width - this.offset.x &&
            this.position.y >= position.y - this.offset.y &&
            position.y >= this.position.y - this.height + this.offset.y
        )
    }
    private hasCollistionWithCloseBtn(position: T_position) {
        const closePosition = { x: this.position.x + this.width - 64, y: this.position.y - this.height }
        return (
            closePosition.x <= position.x &&
            position.x <= closePosition.x + 64 &&
            closePosition.y <= position.y &&
            closePosition.y + 64 >= position.y
        )
    }
    public isClose(position: T_position) {
        return !this.hasCollision(position) || this.hasCollistionWithCloseBtn(position)
    }
}

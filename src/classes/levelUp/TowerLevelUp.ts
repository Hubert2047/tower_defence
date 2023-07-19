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
    constructor({ position, angelKey = E_angels.ANGEL_0, behaviorKey = E_behaviors.IDLE }: T_towerLevelUp) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/menu/tower_menu.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width: 64 * 9, height: 64 * 8, opacity: 0.9 })
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
}

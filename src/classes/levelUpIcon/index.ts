import { E_angels, E_behaviors } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_initFramesDictionary, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'

type T_levelUpIcon = {
    position: T_position
    offset: T_position
    width?: number
    height?: number
    opacity?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    name: string
}
export default class LevelUpIcon extends Sprite {
    behaviorKey: E_behaviors
    angelKey: E_angels
    name: string
    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        width = 48,
        height = 48,
    }: T_levelUpIcon) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelUp/level_up_idle_icon.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4000,
                },
            },
            [E_behaviors.RUN]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelUp/level_up_run_icon.png',
                    maxX: 5,
                    maxY: 3,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        super({ position, frames, width, height, offset, opacity })
        this.angelKey = angelKey
        this.behaviorKey = behaviorKey
        this.name = name
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    hasCollision(position: T_position) {
        return (
            this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width - this.offset.x &&
            this.position.y >= position.y - this.offset.y &&
            position.y >= this.position.y - this.height + this.offset.y
        )
    }
}

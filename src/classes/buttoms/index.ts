import getBaseButtonProperties from '../..//data/baseProperties/buttoms/index.js'
import { E_angels, E_behaviors, E_buttons } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import { I_Button } from '../../types/interface.js'
import Sprite from '../sprite/index.js'
type T_button = {
    position: T_position
    offset?: T_position
    type: E_buttons
    width?: number
    height?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
export default class Button extends Sprite {
    type: E_buttons
    behaviorKey: E_behaviors
    angelKey: E_angels
    constructor({
        position,
        type,
        offset,
        width,
        height,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
    }: T_button) {
        const baseTowerProperties: I_Button = getBaseButtonProperties(type)
        const frames: Map<string, Map<string, T_frame>> = createFrames({
            initFrames: baseTowerProperties.initFrames,
        })
        super({
            position,
            offset,
            frames,
            width: width ?? baseTowerProperties.width,
            height: height ?? baseTowerProperties.height,
        })
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.type = type
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

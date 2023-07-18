import getBasePlantProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characterRoles, E_characters } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import { I_characterProperties } from '../../types/interface.js'
import Sprite from '../sprite/index.js'
type T_stuff = {
    type: E_characters
    position: T_position
    offset?: T_position
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    opacity?: number
}
export default class Shovel extends Sprite {
    name: string
    type: E_characters
    behaviorKey: E_behaviors
    angelKey: E_angels
    role: E_characterRoles
    constructor({
        position,
        offset = { x: 10, y: 54 },
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
    }: T_stuff) {
        const baseTowerProperties: I_characterProperties = getBasePlantProperties(E_characters.SHOVEL)
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames: baseTowerProperties.initFrames })
        super({
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            opacity,
            frames,
        })
        this.name = 'shovel'
        this.type = E_characters.SHOVEL
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.role = E_characterRoles.DESTROY
    }
    public static prices = 5
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
}

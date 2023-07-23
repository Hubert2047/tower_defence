import { E_angels, E_behaviors } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_effectTitleLevel = {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    opacity?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
export default class EffectTitleLevel extends Sprite {
    behaviorKey: E_behaviors
    angelKey: E_angels
    constructor({
        position,
        offset,
        width,
        height,
        behaviorKey = E_behaviors.LEVEL_TITLE_1,
        angelKey = E_angels.ANGEL_0,
        opacity,
    }: T_effectTitleLevel) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.LEVEL_TITLE_1]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelUp/effect/blue_back.png',
                    maxX: 5,
                    maxY: 2,
                    holdTime: 4,
                },
            },
            [E_behaviors.LEVEL_TITLE_2]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelUp/effect/yellow_back.png',
                    maxX: 5,
                    maxY: 2,
                    holdTime: 4,
                },
            },
            [E_behaviors.LEVEL_TITLE_3]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelUp/effect/purple_back.png',
                    maxX: 5,
                    maxY: 2,
                    holdTime: 4,
                },
            },
        }
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, frames, width, height, opacity })
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
}

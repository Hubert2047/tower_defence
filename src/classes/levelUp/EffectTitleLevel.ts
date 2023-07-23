import { E_angels, E_behaviors, E_levelTitle } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_effectTitleLevel = {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    opacity?: number
    currentLevelTitle: string
}
export default class EffectTitleLevel extends Sprite {
    currentLevelTitle: string
    constructor({ position, offset, width, height, opacity = 0.75, currentLevelTitle }: T_effectTitleLevel) {
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
        this.currentLevelTitle = currentLevelTitle
    }
    update() {
        const currentBehavior = this.getCurrentBehavior()
        if (currentBehavior) {
            this.draw({ behaviorKey: currentBehavior, angelKey: E_angels.ANGEL_0 })
        }
    }
    private getCurrentBehavior(): E_behaviors | undefined {
        switch (this.currentLevelTitle) {
            case E_levelTitle.TITLE_1:
                return E_behaviors.LEVEL_TITLE_1
            case E_levelTitle.TITLE_2:
                return E_behaviors.LEVEL_TITLE_2
            case E_levelTitle.TITLE_3:
                return E_behaviors.LEVEL_TITLE_3
            default:
                return undefined
        }
    }
}

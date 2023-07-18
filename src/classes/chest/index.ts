import { E_angels, E_behaviors } from '../../enum/index'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position, T_sprite } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_chest = {
    position: T_position
    width?: number
    height?: number
    angelKey: E_angels
    behaviorKey: E_behaviors
}
export default class Chest extends Sprite {
    public coins: number
    public angelKey: E_angels
    public behaviorKey: E_behaviors
    private coinsIcon: Sprite
    private holdCoinDisplayTime: number
    private currentCountCoinsDisplayTime: number
    constructor({
        position,
        width = 64,
        height = 64,
        angelKey = E_angels.ANGEL_0,
        behaviorKey = E_behaviors.IDLE,
    }: T_chest) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ frames, position, width, height })
        this.coins = 1
        this.coinsIcon = this.createCoinIcon()
        this.holdCoinDisplayTime = 20
        this.currentCountCoinsDisplayTime = 0
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
    }
    update() {
        if (this.isAlreadyOpen) {
            this.currentCountCoinsDisplayTime++
            this.coinsIcon.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        } else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        }
    }
    private get isAlreadyOpen() {
        const currentChestFrame = this.currentFrame
        if (!currentChestFrame) {
            return true
        }
        const isFinishedOneTimeAnimation: boolean =
            this.cropPosition.x === currentChestFrame.maxX - 1 && this.cropPosition.y === currentChestFrame.maxY - 1
        return isFinishedOneTimeAnimation
    }
    private createCoinIcon(): Sprite {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/coins.png',
                    maxX: 4,
                    maxY: 2,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 0, y: 0 },
            height: 32,
            width: 32,
        }
        return new Sprite(options)
    }
    public get isReadyToFakeOut() {
        return this.currentCountCoinsDisplayTime >= this.holdCoinDisplayTime
    }
}

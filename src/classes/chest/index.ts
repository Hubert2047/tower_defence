import { E_angels, E_behaviors } from '../../enum/index.js'
import { createCoinIcon, createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_chest = {
    position: T_position
    width?: number
    height?: number
    angelKey?: E_angels
    behaviorKey?: E_behaviors
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
        width = 96,
        height = 96,
        angelKey = E_angels.ANGEL_0,
        behaviorKey = E_behaviors.ATTACK,
    }: T_chest) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/chest/chest.png',
                    maxX: 3,
                    maxY: 1,
                    holdTime: 50,
                },
            },
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/chest/chest_idle.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 20,
                },
            },
        }
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ frames, position, width, height })
        this.coins = 1
        this.coinsIcon = createCoinIcon({
            position: { x: this.position.x, y: this.position.y },
            offset: { x: -50, y: -40 },
            height: 48,
            width: 48,
        })
        this.holdCoinDisplayTime = 50
        this.currentCountCoinsDisplayTime = 0
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        if (this.isAlreadyOpen) {
            this.behaviorKey = E_behaviors.IDLE
            this.currentCountCoinsDisplayTime++
            this.coinsIcon.position.x = this.position.x
            this.coinsIcon.position.y = this.position.y
            this.coinsIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: this.angelKey })
        }
    }
    private get isAlreadyOpen() {
        const currentChestFrame = this.currentFrame
        if (!currentChestFrame) {
            return false
        }
        const isFinishedOneTimeAnimation: boolean =
            this.cropPosition.x === currentChestFrame.maxX - 1 && this.cropPosition.y === currentChestFrame.maxY - 1
        return isFinishedOneTimeAnimation
    }
    public get isReadyToFakeOut() {
        return this.currentCountCoinsDisplayTime >= this.holdCoinDisplayTime
    }
}

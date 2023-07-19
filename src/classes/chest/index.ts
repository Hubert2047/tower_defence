import { E_angels, E_behaviors, E_chests } from '../../enum/index.js'
import { createFrames, findChestInitFrame } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_chest = {
    position: T_position
    width?: number
    height?: number
    angelKey?: E_angels
    behaviorKey?: E_behaviors
    type: E_chests
}
export default class Chest extends Sprite {
    public coins: number
    public angelKey: E_angels
    public behaviorKey: E_behaviors
    // private gemIcon: Sprite
    private holdCoinDisplayTime: number
    private currentCountCoinsDisplayTime: number
    public type: E_chests
    constructor({
        type,
        position,
        width = 96,
        height = 96,
        angelKey = E_angels.ANGEL_0,
        behaviorKey = E_behaviors.DROP_CHEST,
    }: T_chest) {
        const initFrames: T_initFramesDictionary = findChestInitFrame(type)
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ frames, position, width, height })
        this.coins = 1
        // this.gemIcon = this.createGemIcon({
        //     position: { x: this.position.x, y: this.position.y },
        //     offset: { x: -50, y: -40 },
        //     height: 48,
        //     width: 48,
        // })
        this.type = type
        this.holdCoinDisplayTime = 50
        this.currentCountCoinsDisplayTime = 0
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
    }
    update() {
        if (this.isAlreadyOpen) {
            this.behaviorKey = E_behaviors.IDLE
            this.currentCountCoinsDisplayTime++
            // this.gemIcon.position.x = this.position.x
            // this.gemIcon.position.y = this.position.y
            // this.gemIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        }
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    // private createGemIcon({
    //     position,
    //     offset,
    //     height,
    //     width,
    // }: {
    //     position: T_position
    //     offset: T_position
    //     height: number
    //     width: number
    // }) {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.DROP_CHEST_SILVER]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/gems/blue.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //         [E_behaviors.DROP_CHEST_PURPLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/gems/purple.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //         [E_behaviors.DROP_CHEST_GOLD]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/gems/red.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     return new Sprite({ frames, position, offset, height, width })
    // }

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

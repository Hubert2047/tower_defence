import { FPS } from '../../constants/index.js'
import { E_angels, E_behaviors } from '../../enum/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Gem from '../gems/index.js'
import Sprite from '../sprite/index.js'
type T_chest = {
    position: T_position
    width?: number
    height?: number
    angelKey?: E_angels
    behaviorKey?: E_behaviors
    gem: Gem
    frames: Map<string, Map<string, T_frame>>
}
export default class Chest extends Sprite {
    public coins: number
    public angelKey: E_angels
    public behaviorKey: E_behaviors
    private holdChestDisplayTime: number
    private currentCountChestDisplayTime: number
    gem: Gem
    constructor({
        position,
        width = 96,
        height = 96,
        angelKey = E_angels.ANGEL_0,
        behaviorKey = E_behaviors.DROP_CHEST,
        frames,
        gem,
    }: T_chest) {
        super({ frames, position, width, height })
        this.coins = 1
        this.holdChestDisplayTime = FPS
        this.currentCountChestDisplayTime = 0
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.gem = gem
    }
    update() {
        if (this.behaviorKey !== E_behaviors.DEATH) {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        }
        if (this.isAlreadyOpen && this.behaviorKey !== E_behaviors.DEATH) {
            this.currentCountChestDisplayTime++
            this.behaviorKey = E_behaviors.IDLE
            this.gem.position.x = this.position.x + this.width / 2 + 5
            this.gem.position.y = this.position.y - this.height / 2 - 20
            this.gem.update()
        }
        if (this.currentCountChestDisplayTime >= this.holdChestDisplayTime) {
            this.behaviorKey = E_behaviors.DEATH
            this.gem.haveharvestGems = true
            this.gem.update()
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
        return this.gem.hasHitTarget
    }
}

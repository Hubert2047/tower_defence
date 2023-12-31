import { BLUE_GEM_POSITION, COIN_POSITION, PURPLE_GEM_POSITION, RED_GEM_POSITION } from '../../constants/index.js'
import context2D from '../../context2D/index.js'
import getBaseGemProperties from '../../data/baseProperties/gems/index.js'
import { E_angels, E_behaviors, E_gems } from '../../enum/index.js'
import { createFrames, drawText, getVectorNomalized } from '../../helper/index.js'
import { T_frame, T_position, T_text } from '../../types/index.js'
import Sprite from '../sprite/index.js'
type T_gem = {
    position: T_position
    gemType: E_gems
    gemNum: number
    offset?: T_position
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    moveSpeed?: number
    opacity?: number
    isDisplayGemNum?: boolean
    width?: number
    height?: number
}
export default class Gem extends Sprite {
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    public gemType: E_gems
    private moveSpeed: number
    private velocityX: number
    private velocityY: number
    private gemNum: number
    private targetPosition: T_position
    public haveharvestGems: boolean
    public isDisplayGemNum: boolean
    constructor({
        position,
        gemType,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        offset,
        gemNum = 1,
        moveSpeed = 250,
        opacity = 1,
        isDisplayGemNum = true,
        width,
        height,
    }: T_gem) {
        const currentGemProperties = getBaseGemProperties(gemType)
        const frames: Map<string, Map<string, T_frame>> = createFrames({
            initFrames: currentGemProperties.initFrames,
        })
        super({
            position,
            frames,
            width: width ?? currentGemProperties.width,
            height: height ?? currentGemProperties.height,
            offset,
            opacity,
        })
        this.angelKey = angelKey
        this.behaviorKey = behaviorKey
        this.gemType = gemType
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.targetPosition = this.findTargetPosition()
        this.gemNum = gemNum
        this.isDisplayGemNum = isDisplayGemNum
        this.haveharvestGems = false
    }
    public get hasHitTarget() {
        return this.position.x === this.targetPosition.x && this.position.y === this.targetPosition.y
    }
    public update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        if (context2D && this.isDisplayGemNum) {
            const textString = `+${this.gemNum.toString()}`
            const textWidth = context2D.measureText(textString).width
            const textOptions: T_text = {
                text: textString,
                position: {
                    x: this.position.x + this.width - textWidth / 2 - this.offset.x,
                    y: this.position.y - this.height + 10 - this.offset.y,
                },
                color: 'white',
                fontSize: 16,
            }
            drawText(textOptions)
        }
        if (this.hasHitTarget) return
        if (this.haveharvestGems) {
            this.opacity = 0.5
            this.updatePosition()
        }
    }

    private findTargetPosition() {
        switch (this.gemType) {
            case E_gems.BLUE:
                return BLUE_GEM_POSITION
            case E_gems.RED:
                return RED_GEM_POSITION
            case E_gems.PURPLE:
                return PURPLE_GEM_POSITION
            case E_gems.COIN:
                return COIN_POSITION
            default:
                return BLUE_GEM_POSITION
        }
    }
    private updatePosition(): void {
        this.updateVelocity()
        this.position.x += this.velocityX
        this.position.y += this.velocityY
        if (this.position.x >= this.targetPosition.x && this.velocityX > 0) {
            this.position.x = this.targetPosition.x
        }
        if (this.position.y >= this.targetPosition.y && this.velocityY > 0) {
            this.position.y = this.targetPosition.y
        }
    }
    public hasCollision(mouse: T_position) {
        return (
            this.position.x <= mouse.x &&
            mouse.x <= this.position.x + this.width &&
            this.position.y - 30 <= mouse.y &&
            mouse.y <= this.position.y - 30 + this.height
        )
    }
    private updateVelocity(): void {
        const v_normalized: T_position = getVectorNomalized(this.position, this.targetPosition)
        this.velocityX = (this.moveSpeed / 10) * v_normalized.x
        this.velocityY = (this.moveSpeed / 10) * v_normalized.y
    }
}

import context2D from '../../context2D/index.js'
import { calAngleFromPointAToPointB, calFullHealthWidth, getVectorNomalized } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Projectile from '../projectiles/index.js'
import Sprite from '../sprite/index.js'
enum DragonSourceIndex {
    TopSource = 0,
    LeftSource = 1,
    RightSource = 2,
    BottomSource = 3,
}
interface healthBar {
    lineWidth: number
    height: number
    borderRadius: number
    strokeStyle: string
}
interface props {
    position: T_position
    offset: T_position
    width: number
    height: number
    imageSources: HTMLImageElement[]
    frame: T_frame
    coins: number
    moveSpeed: number
    HP: number
}
export default class Enemy extends Sprite {
    private moveSpeed: number
    private velocityX: number
    private velocityY: number
    public coins: number
    private currentWayPointIndex: number
    private HP: number
    private _remainHP: number
    constructor({ position, offset, width, height, imageSources, frame, coins, moveSpeed, HP }: props) {
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            frame,
        })
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.currentWayPointIndex = 0
        this.coins = coins
        this._remainHP = HP
        this.HP = HP
    }
    set remainHP(remainHP: number) {
        if (remainHP <= 0) {
            this._remainHP = 0
        } else {
            this._remainHP = remainHP
        }
    }
    get remainHP() {
        return this._remainHP
    }
    public update(waypoints: T_position[]): void {
        this.draw({ sourceIndex: this.getCurrentImageSourceIndex(waypoints) })
        this.updatePosition(waypoints)
        this.updateHealthBars()
    }
    private drawRemainHealthBar({
        drawOption,
        remainHealthWidth,
        fullHealthWidth,
        fillStyle,
    }: {
        drawOption: healthBar
        remainHealthWidth: number
        fullHealthWidth: number
        fillStyle: string
    }) {
        if (context2D) {
            const center = (this.width - 2 * this.offset.x - fullHealthWidth) / 2
            const x = this.position.x + center
            const y = this.position.y - this.height + 2 * this.offset.y
            // start draw
            context2D.beginPath()
            // draw top
            context2D.moveTo(x + drawOption.borderRadius, y)
            context2D.lineTo(x + remainHealthWidth, y)
            context2D.arcTo(
                x + remainHealthWidth,
                y,
                x + remainHealthWidth,
                y + drawOption.borderRadius,
                drawOption.borderRadius
            )
            // draw right
            context2D.lineTo(x + remainHealthWidth, y + drawOption.height)
            // draw bottom
            context2D.arcTo(
                x + remainHealthWidth,
                y + drawOption.height,
                x + remainHealthWidth - drawOption.borderRadius,
                y + drawOption.height,
                drawOption.borderRadius
            )
            context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height)
            // draw left border radius
            context2D.arcTo(x, y + drawOption.height, x, y + drawOption.borderRadius, drawOption.borderRadius)
            context2D.lineTo(x, y + drawOption.borderRadius)
            // draw left border radius
            context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius)

            context2D.closePath()
            context2D.strokeStyle = drawOption.strokeStyle
            context2D.fillStyle = fillStyle
            context2D.lineWidth = drawOption.lineWidth
            context2D.stroke()
            context2D.fill()
        }
    }
    private drawHealthBarFull({
        drawOption,
        fullHealthWidth,
        fillStyle,
    }: {
        drawOption: healthBar
        fullHealthWidth: number
        fillStyle: string
    }) {
        if (context2D) {
            const center = (this.width - 2 * this.offset.x - fullHealthWidth) / 2
            const x = this.position.x + center
            const y = this.position.y - this.height + 2 * this.offset.y
            context2D.beginPath()

            // draw top rectangle
            context2D.moveTo(x + drawOption.borderRadius, y)
            context2D.lineTo(x + fullHealthWidth - drawOption.borderRadius, y)
            context2D.arcTo(
                x + fullHealthWidth,
                y,
                x + fullHealthWidth,
                y + drawOption.borderRadius,
                drawOption.borderRadius
            )

            // draw right rectangle
            context2D.lineTo(x + fullHealthWidth, y + drawOption.height - drawOption.borderRadius)
            context2D.arcTo(
                x + fullHealthWidth,
                y + drawOption.height,
                x + fullHealthWidth - drawOption.borderRadius,
                y + drawOption.height,
                drawOption.borderRadius
            )

            // draw bottom rectangle
            context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height)
            context2D.arcTo(
                x,
                y + drawOption.height,
                x,
                y + drawOption.height - drawOption.borderRadius,
                drawOption.borderRadius
            )

            // draw left rectangle
            context2D.lineTo(x, y + drawOption.borderRadius)
            context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius)

            // end draw
            context2D.closePath()
            // draw stroke and color
            context2D.strokeStyle = drawOption.strokeStyle
            context2D.fillStyle = fillStyle
            context2D.lineWidth = drawOption.lineWidth
            context2D.stroke()
            context2D.fill()
            this.drawHealthText(x, y, fullHealthWidth)
        }
    }
    private drawHealthText(x: number, y: number, fullHealthWidth: number) {
        if (context2D) {
            context2D.font = '16px Arial'
            context2D.fillStyle = 'white'
            const remainHpString = this.remainHP.toString()
            const textWidth = context2D.measureText(remainHpString).width
            context2D.fillText(remainHpString, x + fullHealthWidth / 2 - textWidth / 2, y - 8)
        }
    }
    private updateHealthBars() {
        const drawOption = {
            lineWidth: 2,
            height: 8,
            borderRadius: 4,
            strokeStyle: 'white',
        }
        const fullHealthWidth = calFullHealthWidth(this.HP)
        const remainHealthWidth = (this.remainHP * fullHealthWidth) / this.HP
        this.drawHealthBarFull({ drawOption, fullHealthWidth, fillStyle: 'red' })
        if (fullHealthWidth === remainHealthWidth) {
            this.drawHealthBarFull({ drawOption, fullHealthWidth, fillStyle: 'green' })
        } else {
            this.drawRemainHealthBar({
                drawOption,
                fullHealthWidth,
                remainHealthWidth,
                fillStyle: 'green',
            })
        }
    }
    private updatePosition(waypoints: T_position[]): void {
        this.updateVelocity(waypoints)
        this.position.x += this.velocityX
        this.position.y += this.velocityY
        if (this.position.x >= waypoints[this.currentWayPointIndex].x && this.velocityX > 0) {
            this.position.x = waypoints[this.currentWayPointIndex].x
        }
        if (this.position.y >= waypoints[this.currentWayPointIndex].y && this.velocityY > 0) {
            this.position.y = waypoints[this.currentWayPointIndex].y
        }
        if (
            this.position.x === waypoints[this.currentWayPointIndex].x &&
            this.position.y === waypoints[this.currentWayPointIndex].y &&
            this.currentWayPointIndex < waypoints.length - 1
        ) {
            this.currentWayPointIndex++
        }
    }
    private updateVelocity(waypoints: T_position[]): void {
        const v_normalized: T_position = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex])
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
    private getCurrentImageSourceIndex(waypoints: T_position[]): number {
        const angel = calAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex])
        if (angel <= 45 && angel > -45) {
            return DragonSourceIndex.RightSource
        }
        if (angel <= -45 && angel > -135) {
            return DragonSourceIndex.TopSource
        }
        if (angel <= 135 && angel > 45) {
            return DragonSourceIndex.BottomSource
        }
        if (angel <= 180 && angel > 135) {
            return DragonSourceIndex.LeftSource
        }
        return 1
    }
    public attacked(projectile: Projectile): void {
        this.remainHP -= projectile.damage
    }
}

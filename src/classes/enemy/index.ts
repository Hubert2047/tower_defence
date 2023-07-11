import { E_angels, E_behaviors, E_enemy } from 'src/enum/index.js'
import context2D from '../../context2D/index.js'
import { calAngleFromPointAToPointB, calFullHealthWidth, createFrames, getVectorNomalized } from '../../helper/index.js'
import { T_enemy, T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Projectile from '../projectile/index.js'
import Sprite from '../sprite/index.js'
interface healthBar {
    lineWidth: number
    height: number
    borderRadius: number
    strokeStyle: string
}
export default class Enemy extends Sprite {
    public name: string
    public enemyType: E_enemy
    public moveSpeed: number
    private velocityX: number
    private velocityY: number
    public coins: number
    private currentWayPointIndex: number
    private health: number
    private _remainHealth: number
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    public initFrames: T_initFramesDictionary
    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        initFrames,
        coins = 1,
        moveSpeed = 1,
        health = 1000,
        enemyType,
        angelKey = E_angels.ANGEL_90,
        behaviorKey = E_behaviors.RUN,
    }: T_enemy) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames, moveSpeed })
        super({
            position,
            offset,
            width,
            height,
            frames,
        })
        this.name = name
        this.initFrames = initFrames
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.currentWayPointIndex = 0
        this.coins = coins
        this._remainHealth = health
        this.health = health
        this.enemyType = enemyType
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
    }
    set remainHealth(remainHealth: number) {
        if (remainHealth <= 0) {
            this._remainHealth = 0
        } else {
            this._remainHealth = remainHealth
        }
    }
    get remainHealth() {
        return this._remainHealth
    }
    public update(waypoints: T_position[]): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.updateFrameKeys(waypoints)
        this.updatePosition(waypoints)
        this.updateHealthBars()
    }
    public updateDeathEffect() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    private updateFrameKeys(waypoints: T_position[]) {
        this.updateAngelKey(waypoints)
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
            const remainHealthString = this.remainHealth.toString()
            const textWidth = context2D.measureText(remainHealthString).width
            context2D.fillText(remainHealthString, x + fullHealthWidth / 2 - textWidth / 2, y - 8)
        }
    }
    private updateHealthBars() {
        const drawOption = {
            lineWidth: 2,
            height: 8,
            borderRadius: 4,
            strokeStyle: 'white',
        }
        const fullHealthWidth = calFullHealthWidth(this.health)
        const remainHealthWidth = (this.remainHealth * fullHealthWidth) / this.health
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
    private updateAngelKey(waypoints: T_position[]): void {
        const angel = calAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex])
        let angelKey: E_angels = E_angels.ANGEL_0
        if (angel <= 45 && angel > -45) {
            angelKey = E_angels.ANGEL_90
        }
        if (angel <= -45 && angel > -135) {
            angelKey = E_angels.ANGEL_0
        }
        if (angel <= 135 && angel > 45) {
            angelKey = E_angels.ANGEL_180
        }
        if (angel <= 180 && angel > 135) {
            angelKey = E_angels.ANGEL_90
        }
        this.angelKey = angelKey
    }
    public attacked(projectile: Projectile): void {
        this.remainHealth -= projectile.damage
    }
}

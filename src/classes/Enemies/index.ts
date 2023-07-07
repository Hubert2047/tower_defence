import { waypoints } from '../../data/index.js'
import { getAngleFromPointAToPointB, getVectorNomalized } from '../../helper/index.js'
import { position } from '../../types/index.js'
import Projectile from '../Projectiles/index.js'
import Sprite from '../Sprite/index.js'
enum DragonSourceIndex {
    TopSource = 0,
    LeftSource = 1,
    RightSource = 2,
    BottomSource = 3,
}
export default class Enemy extends Sprite {
    private moveSpeed: number
    private velocityX: number
    private velocityY: number
    private currentWayPointIndex: number
    private _HP: number
    constructor({
        position = { x: 0, y: 0 },
        moveSpeed = 2,
        HP = 1000,
        imageSources,
        frameMaxX = 1,
        frameMaxY = 1,
        offset,
        width = 200,
        height = 200,
    }: {
        position: position
        moveSpeed?: number
        HP?: number
        imageSources: HTMLImageElement[]
        frameMaxX: number
        frameMaxY: number
        offset?: position
        width?: number
        height?: number
    }) {
        super({
            position,
            imageSources,
            frameMaxX,
            frameMaxY,
            width,
            height,
            frameTime: 10 / moveSpeed,
            offset,
        })
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.currentWayPointIndex = 0
        this._HP = HP
    }
    get HP() {
        return this._HP
    }
    set HP(hp: number) {
        if (hp <= 0) {
            this._HP = 0
        } else {
            this._HP = hp
        }
    }
    public update(): void {
        this.draw(this.getCurrentImageSourceIndex())
        this.updatePosition()
    }
    private updatePosition(): void {
        this.updateVelocity()
        this.position.x += parseInt(this.velocityX.toString())
        this.position.y += parseInt(this.velocityY.toString())
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
    private updateVelocity(): void {
        const v_normalized: position = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex])
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
    private getCurrentImageSourceIndex(): number {
        const angel = getAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex])
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
        this.HP -= projectile.damage
    }
}

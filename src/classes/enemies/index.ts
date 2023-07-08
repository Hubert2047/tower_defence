import { calAngleFromPointAToPointB, getVectorNomalized } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Projectile from '../projectiles/index.js'
import Sprite from '../sprite/index.js'
enum DragonSourceIndex {
    TopSource = 0,
    LeftSource = 1,
    RightSource = 2,
    BottomSource = 3,
}
interface props {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    imageSources: HTMLImageElement[]
    frame?: T_frame
    moveSpeed?: number
    HP?: number
}
export default class Enemy extends Sprite {
    private moveSpeed: number
    private velocityX: number
    private velocityY: number
    private currentWayPointIndex: number
    private _HP: number
    constructor({
        position = { x: 0, y: 0 },
        offset,
        width = 200,
        height = 200,
        imageSources,
        frame,
        moveSpeed = 2,
        HP = 1000,
    }: props) {
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
    public update(waypoints: T_position[]): void {
        this.draw({ sourceIndex: this.getCurrentImageSourceIndex(waypoints) })
        this.updatePosition(waypoints)
    }
    private updatePosition(waypoints: T_position[]): void {
        this.updateVelocity(waypoints)
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
        this.HP -= projectile.damage
    }
}

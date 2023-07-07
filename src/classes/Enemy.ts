import { waypoints } from '../data/index.js'
import { getVectorNomalized } from '../helper/index.js'
import { position } from '../types/index.js'
import Projectile from './Projectile.js'
import Sprite from './Sprite.js'
export default class Enemy extends Sprite {
    private moveSpeed: number
    private velocityX: number
    private velocityY: number
    private currentWayPointIndex: number
    private _HP: number
    constructor({
        position = { x: 0, y: 0 },
        moveSpeed = 1,
        HP = 1000,
    }: {
        position: position
        moveSpeed?: number
        HP?: number
    }) {
        super({ position, imageSrc: '../../public/src/assets/images/knight.png', frameMax: 8, width: 100, height: 100 })
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
        this.draw()
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
    public attacked(projectile: Projectile): void {
        this.HP -= projectile.damage
    }
}

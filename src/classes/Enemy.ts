import { waypoints } from '../data/index.js'
import { createImageSources, getAngleFromPointAToPointB, getVectorNomalized } from '../helper/index.js'
import { position } from '../types/index.js'
import Projectile from './Projectile.js'
import Sprite from './Sprite.js'
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
    }: {
        position: position
        moveSpeed?: number
        HP?: number
    }) {
        const dragonSources = [
            '../../public/src/assets/images/dragon/top.png',
            '../../public/src/assets/images/dragon/left.png',
            '../../public/src/assets/images/dragon/right.png',
            '../../public/src/assets/images/dragon/bottom.png',
        ]
        const foxSources = [
            '../../public/src/assets/images/fox/top.png',
            '../../public/src/assets/images/fox/left.png',
            '../../public/src/assets/images/fox/right.png',
            '../../public/src/assets/images/fox/bottom.png',
        ]
        const bearSources = [
            '../../public/src/assets/images/bear/top_0.png',
            '../../public/src/assets/images/bear/left_290.png',
            '../../public/src/assets/images/bear/right_90.png',
            '../../public/src/assets/images/bear/bottom_180.png',
        ]
        const broodmotherSources = [
            '../../public/src/assets/images/broodmother/top_0.png',
            '../../public/src/assets/images/broodmother/left_290.png',
            '../../public/src/assets/images/broodmother/right_90.png',
            '../../public/src/assets/images/broodmother/bottom_180.png',
        ]
        const sirenSources = [
            '../../public/src/assets/images/Siren/top_0.png',
            '../../public/src/assets/images/Siren/left_290.png',
            '../../public/src/assets/images/Siren/right_90.png',
            '../../public/src/assets/images/Siren/bottom_180.png',
        ]
        // const imageSources: HTMLImageElement[] = createImageSources(dragonSources)
        // const imageSources: HTMLImageElement[] = createImageSources(foxSources)
        // const imageSources: HTMLImageElement[] = createImageSources(bearSources)
        // const imageSources: HTMLImageElement[] = createImageSources(broodmotherSources)
        const imageSources: HTMLImageElement[] = createImageSources(sirenSources)
        super({
            position,
            imageSources,
            frameMaxX: 5,
            frameMaxY: 4,
            width: 300,
            height: 300,
            frameTime: 10 / moveSpeed,
            offset: { x: 0, y: 20 },
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

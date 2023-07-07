import { createImageSources, getVectorNomalized } from '../helper/index.js'
import { position } from '../types/index.js'
import Enemy from './Enemy.js'
import Sprite from './Sprite.js'
export default class Projectile extends Sprite {
    public moveSpeed: number
    private velocityX: number
    private velocityY: number
    private radius: number
    public targetEnemy: Enemy
    public damage: number
    constructor({
        position = { x: 0, y: 0 },
        moveSpeed = 5,
        enemy,
        damage,
    }: {
        position: position
        moveSpeed?: number
        damage: number
        enemy: Enemy
    }) {
        const sources = [
            '../../public/src/assets/images/dragon_top.png',
            '../../public/src/assets/images/dragon_left.png',
            '../../public/src/assets/images/dragon_right.png',
            '../../public/src/assets/images/dragon_bottom.png',
        ]
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        super({ position, imageSources })
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.radius = 10
        this.damage = damage
        this.targetEnemy = enemy
    }

    // protected draw(): void {
    //     if (context2D) {
    //         context2D.beginPath()
    //         context2D.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    //         context2D.fillStyle = 'orange'
    //         context2D.fill()
    //     }
    // }
    public update(): void {
        this.draw(1)
        this.updatePosition()
    }
    private updatePosition(): void {
        this.updateVelocity()
        this.position.x += parseInt(this.velocityX.toString())
        this.position.y += parseInt(this.velocityY.toString())
        if (this.position.x >= this.targetEnemy.position.x && this.velocityX > 0) {
            this.position.x = this.targetEnemy.position.x
        }
        if (this.position.y >= this.targetEnemy.position.y && this.velocityY > 0) {
            this.position.y = this.targetEnemy.position.y
        }
        if (this.position.x === this.targetEnemy.position.x && this.position.y === this.targetEnemy.position.y) {
        }
    }
    private updateVelocity(): void {
        const v_normalized: position = getVectorNomalized(this.position, this.targetEnemy.position)
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}

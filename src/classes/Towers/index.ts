// import context2D from '../../context2D/index.js'
import { getCurrentEnemies } from '../../data/enemies.js'
import { calculateDistanceTwoPoint } from '../../helper/index.js'
import { position } from '../../types/index.js'
import Enemy from '../Enemies/index.js'
import BloodMoonProjectile from '../Projectiles/BloodMoon.projectile.js'
import Projectile from '../Projectiles/index.js'
import Sprite from '../Sprite/index.js'
export default class Tower extends Sprite {
    public attackSpeed: number
    private center: position
    public attackIntervalId: number | null
    public attackArea: number
    public damage: number
    public projectiles: Projectile[]
    public projectileImageSources: HTMLImageElement[]
    constructor({
        position = { x: 0, y: 0 },
        offset,
        width = 100,
        height = 200,
        frameMaxX = 1,
        frameMaxY = 1,
        imageSources,
        projectileSources,
        attackSpeed = 1,
        damage = 300,
    }: {
        position: position
        offset?: position
        width?: number
        height?: number
        frameMaxX: number
        frameMaxY: number
        imageSources: HTMLImageElement[]
        projectileSources: HTMLImageElement[]
        attackSpeed?: number
        damage?: number
    }) {
        super({ position, offset, width, height, imageSources, frameMaxX, frameMaxY })
        this.attackSpeed = attackSpeed
        this.center = { x: position.x + width / 2, y: position.y + height / 2 }
        this.attackIntervalId = null
        this.attackArea = 300
        this.damage = damage
        this.projectileImageSources = projectileSources
        this.projectiles = []
        this.startAttack()
    }
    public draw(sourceIndex: number): void {
        super.draw(sourceIndex)
        // if (context2D) {
        //     context2D.beginPath()
        //     context2D.arc(
        //         this.position.x - this.width / 2 + 4 * this.offset.x,
        //         this.position.y - this.height / 2 + this.offset.y,
        //         this.attackArea,
        //         0,
        //         2 * Math.PI
        //     )
        //     context2D.fillStyle = 'rgba(225,225,225,0,1)'
        //     context2D.fill()
        // }
    }
    public update(): void {
        this.draw(0)
        this.updateProjectile()
    }

    private startAttack(): void {
        this.handleAttack()
        this.attackIntervalId = setInterval(() => {
            this.handleAttack()
        }, 1000 / this.attackSpeed)
    }
    private handleAttack(): void {
        const currentEnemies = getCurrentEnemies()
        if (currentEnemies.length <= 0) return
        const enemiesInRange: Enemy[] = this.getEnemiesInAttackRange(currentEnemies)
        if (enemiesInRange.length > 0) {
            const newProjectile: Projectile = new BloodMoonProjectile({
                position: {
                    x: this.position.x - this.width / 2,
                    y: this.position.y - this.height / 2,
                },
                damage: this.damage,
                projectileSources: this.projectileImageSources,
                enemy: enemiesInRange[0],
                frameMaxX: 1,
                frameMaxY: 1,
                width: 30,
                height: 30,
                moveSpeed: 20,
            })
            this.projectiles.push(newProjectile)
        }
    }
    private getEnemiesInAttackRange(currentEnemies: Enemy[]): Enemy[] {
        const enemiesInRange: Enemy[] = []
        currentEnemies.forEach((enemy: Enemy) => {
            const realX = this.position.x - this.width / 2 + 2.5 * this.offset.x
            const realY = this.position.y - this.height / 2 + this.offset.y
            const distance: number = calculateDistanceTwoPoint(enemy.position, { x: realX, y: realY })
            if (distance <= this.attackArea) {
                enemiesInRange.push(enemy)
            }
        })
        return enemiesInRange
    }
    public clearAttackAction(): void {
        if (this.attackIntervalId) {
            clearInterval(this.attackIntervalId)
        }
    }
    private updateProjectile() {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile: Projectile = this.projectiles[i]
            const realX = currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 2
            const realY = currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 2
            const distance: number = calculateDistanceTwoPoint(currentProjectile.position, { x: realX, y: realY })
            if (distance < 70) {
                currentProjectile.targetEnemy.attacked(currentProjectile)
                this.projectiles.splice(i, 1)
            } else {
                currentProjectile.update()
            }
        }
    }
}

import context2D from '../context2D/index.js'
import { getCurrentEnemies } from '../data/enemies.js'
import { calculateDistanceTwoPoint, createImageSources } from '../helper/index.js'
import { position } from '../types/index.js'
import Enemy from './Enemy.js'
import Projectile from './Projectile.js'
import Sprite from './Sprite.js'
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
        attackSpeed = 1,
        damage = 300,
        width = 120,
        height = 220,
    }: {
        position: position
        attackSpeed?: number
        damage?: number
        width?: number
        height?: number
    }) {
        const sources = ['../../public/src/assets/images/Tower/BloodMoon/tower_bloodmoon.png']
        const projectileSources = ['../../public/src/assets/images/Tower/BloodMoon/projectile_bloodmoon.png']
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        // super({ position, imageSources, width, height, frameMaxX: 11, offset: { x: -30, y: 80 } })
        super({ position, imageSources, width, height, frameMaxX: 11, offset: { x: 0, y: 0 } })
        this.attackSpeed = attackSpeed
        this.center = { x: position.x + width / 2, y: position.y + height / 2 }
        this.attackIntervalId = null
        this.attackArea = 300
        this.damage = damage
        this.projectileImageSources = createImageSources(projectileSources)
        this.projectiles = []
        this.startAttack()
    }
    public draw(sourceIndex: number): void {
        super.draw(sourceIndex)
        if (context2D) {
            context2D.beginPath()
            context2D.arc(this.center.x, this.center.y, this.attackArea, 0, 2 * Math.PI)
            context2D.fillStyle = 'rgba(225,225,225,0,1)'
            context2D.fill()
        }
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
            const newProjectile: Projectile = new Projectile({
                position: { ...this.center },
                damage: this.damage,
                imageSources: this.projectileImageSources,
                enemy: enemiesInRange[0],
                frameMaxX: 1,
                frameMaxY: 1,
                width: 30,
                height: 30,
                offset: { x: -80, y: 60 },
            })
            this.projectiles.push(newProjectile)
        }
    }
    private getEnemiesInAttackRange(currentEnemies: Enemy[]): Enemy[] {
        const enemiesInRange: Enemy[] = []
        currentEnemies.forEach((enemy: Enemy) => {
            const distance: number = calculateDistanceTwoPoint(enemy.position, { ...this.center })
            console.log('distance', distance)
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
            const distance: number = calculateDistanceTwoPoint(
                currentProjectile.position,
                currentProjectile.targetEnemy.position
            )
            if (distance < 10) {
                currentProjectile.targetEnemy.attacked(currentProjectile)
                this.projectiles.splice(i, 1)
            } else {
                currentProjectile.update()
            }
        }
    }
}

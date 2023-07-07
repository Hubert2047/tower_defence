import { TILE_SIZE } from '../constants/index.js'
import context2D from '../context2D/index.js'
import currentEnemies from '../data/enemies.js'
import { calculateDistanceTwoPoint } from '../helper/index.js'
import { position } from '../interface/index.js'
import Enemy from './Enemy.js'
import Projectile from './Projectile.js'
export default class Tower {
    public position: position
    private width: number
    private height: number
    public attackSpeed: number
    private center: position
    public attackIntervalId: number | null
    public attackArea: number
    public damage: number
    public projectiles: Projectile[]
    constructor({
        position = { x: 0, y: 0 },
        attackSpeed = 1,
        damage = 1,
    }: {
        position: position
        attackSpeed?: number
        damage?: number
    }) {
        this.position = position
        this.width = 2 * TILE_SIZE
        this.height = TILE_SIZE
        this.attackSpeed = attackSpeed
        this.center = { x: position.x + this.width / 2, y: position.y + this.height / 2 }
        this.attackIntervalId = null
        this.attackArea = 300
        this.damage = damage
        this.projectiles = []
        this.startAttack()
    }
    private draw(): void {
        if (context2D) {
            context2D.fillStyle = 'green'
            context2D.fillRect(this.position.x, this.position.y, this.width, this.height)
            context2D.beginPath()
            context2D.arc(this.center.x, this.center.y, this.attackArea, 0, 2 * Math.PI)
            context2D.fillStyle = 'rgba(255,255,255,0.15)'
            context2D.fill()
        }
    }
    public update(): void {
        this.draw()
        this.updateProjectile()
    }
    private startAttack(): void {
        this.handleAttack()
        this.attackIntervalId = setInterval(() => {
            this.handleAttack()
        }, 1000 / this.attackSpeed)
    }
    private handleAttack(): void {
        if (currentEnemies.length <= 0) return
        const enemiesInRange: Enemy[] = this.getEnemiesInAttackRange()
        if (enemiesInRange.length > 0) {
            const newProjectile: Projectile = new Projectile({
                position: { ...this.center },
                damage: this.damage,
                enemy: enemiesInRange[0],
            })
            this.projectiles.push(newProjectile)
        }
    }
    private getEnemiesInAttackRange(): Enemy[] {
        const enemiesInRange: Enemy[] = []
        currentEnemies.forEach((enemy) => {
            const distance: number = calculateDistanceTwoPoint(enemy.position, { ...this.center })
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
        for (let i = 0; i < this.projectiles.length; i++) {
            const currentProjectile: Projectile = this.projectiles[i]
            const distance: number = calculateDistanceTwoPoint(
                currentProjectile.position,
                currentProjectile.targetEnemy.position
            )
            if (distance < 20) {
                currentProjectile.targetEnemy.attacked(currentProjectile)
                i--
            } else {
                currentProjectile.update()
            }
        }
    }
}

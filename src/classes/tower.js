import { TILE_SIZE } from '../constants/index.js'
import c from '../context2D.js'
import currentEnemies from '../data/enemies.js'
import { calculateDistanceTwoPoint } from '../helper/index.js'
import Projectile from './projectile.js'
export default class Tower {
    constructor({ position = { x: 0, y: 0 }, attackSpeed = 1, damage = 1 }) {
        this.position = position
        this.width = 2 * TILE_SIZE
        this.height = TILE_SIZE
        this.attackSpeed = attackSpeed
        this.center = { x: position.x + this.width / 2, y: position.y + this.height / 2 }
        this.projectiles = []
        this.attackIntervalId = null
        this.attack()
        this.attackArea = 300
        this.damage = damage
    }
    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.beginPath()
        c.arc(this.center.x, this.center.y, this.attackArea, 0, 2 * Math.PI)
        c.fillStyle = 'rgba(255,255,255,0.15)'
        c.fill()
    }
    update() {
        this.draw()
    }
    attack() {
        this.handleAttack()
        this.attackIntervalId = setInterval(() => {
            this.handleAttack()
        }, 1000 / this.attackSpeed)
    }
    getEnemiesInAttackRange() {
        const enemiesInRange = []
        currentEnemies.forEach((enemy) => {
            const distance = calculateDistanceTwoPoint(enemy.position, { ...this.center })
            if (distance <= this.attackArea) {
                enemiesInRange.push(enemy)
            }
        })
        return enemiesInRange
    }
    handleAttack() {
        if (currentEnemies.length <= 0) return
        const enemiesInRange = this.getEnemiesInAttackRange()
        if (enemiesInRange.length > 0) {
            const newProjectile = new Projectile({
                position: { ...this.center },
                damage: this.damage,
                enemy: enemiesInRange[0],
            })
            enemiesInRange[0].attacked(newProjectile)
        }
    }

    clearAttackAction() {
        if (this.attackIntervalId) {
            clearInterval(this.attackIntervalId)
        }
    }
}

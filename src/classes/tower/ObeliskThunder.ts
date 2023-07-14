import Thunder from '../../classes/projectile/Thunder.js'
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { E_angels, E_behaviors, E_tower } from '../../enum/index.js'
import { I_tower, I_towerProperties } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import Projectile from '../projectile/index.js'
import Tower from './index.js'

export default class ObeliskThunderTower extends Tower {
    baseTowerProperties: I_towerProperties
    constructor({
        position,
        offset = { x: 10, y: 55 },
        damage = 3000,
        attackSpeed = 2,
        attackRange = 300,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
    }: I_tower) {
        const baseTowerProperties: I_towerProperties = getBaseTowerProperties(E_tower.OBELISK_THUNDER)

        super({
            name: 'Obelisk Thunder Tower',
            towerType: E_tower.OBELISK_THUNDER,
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            initFrames: baseTowerProperties.initFrames,
            damage,
            attackSpeed,
            attackRange,
            behaviorKey,
            angelKey,
            opacity,
            attackTargetNums: 3,
        })
        this.baseTowerProperties = baseTowerProperties
    }
    public static prices = 20
    public update({
        enemies,
        shootingAudio,
    }: {
        enemies: Enemy[]
        shootingAudio: HTMLAudioElement | HTMLElement | null
    }): void {
        super.update({
            enemies,
            shootingAudio,
        })
        if (this.behaviorKey === E_behaviors.ATTACK) {
            this.width = this.baseTowerProperties.width
            this.height = 160
        } else {
            this.width = this.baseTowerProperties.width
            this.height = this.baseTowerProperties.height
        }
    }
    public createProjectiles(targetEnemies: Enemy[]): Projectile[] {
        const width = 80
        const height = 130
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: enemy.position.x + enemy.width / 2 - width / 2,
                    y: enemy.position.y - enemy.height / 2,
                },
                damage: this.damage,
                enemy,
                width,
                height,
                offset: { x: 20, y: 0 },
            }
            return new Thunder(projectileOptions)
        })
    }
}

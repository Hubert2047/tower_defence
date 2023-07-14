import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { E_angels, E_behaviors, E_tower } from '../../enum/index.js'
import { I_tower, I_towerProperties } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import NuclearProjectile from '../projectile/Nuclear.js'
import Projectile from '../projectile/index.js'
import Tower from './index.js'

export default class BloodMoonTower extends Tower {
    constructor({
        position,
        offset = { x: 10, y: 60 },
        damage = 1000,
        attackSpeed = 5,
        attackRange = 300,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
    }: I_tower) {
        const baseTowerProperties: I_towerProperties = getBaseTowerProperties(E_tower.BLOOD_MOON)
        super({
            name: 'Blood Moon Tower',
            towerType: E_tower.BLOOD_MOON,
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
        })
    }
    public static prices = 10
    public createProjectiles(targetEnemies: Enemy[]): Projectile[] {
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y,
                },
                damage: this.damage,
                enemy,
                offset: { x: 25, y: -40 },
            }
            return new NuclearProjectile(projectileOptions)
        })
    }
}

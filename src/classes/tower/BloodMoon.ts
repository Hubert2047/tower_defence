import getBaseTowerProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js'
import { I_characterProperties, I_tower } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import Projectile from '../projectile/index.js'
import NuclearProjectile from '../projectile/Nuclear.js'
import Tower from './index.js'

export default class BloodMoonTower extends Tower {
    action: E_characterActions
    constructor({
        position,
        offset = { x: 10, y: 60 },
        damage = 1000,
        attackSpeed = 5,
        attackRange = 300,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile = null,
    }: I_tower) {
        const baseTowerProperties: I_characterProperties = getBaseTowerProperties(E_characters.BLOOD_MOON)
        super({
            name: 'Blood Moon Tower',
            type: E_characters.BLOOD_MOON,
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
            placementTile,
        })
        this.action = E_characterActions.ATTACK
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

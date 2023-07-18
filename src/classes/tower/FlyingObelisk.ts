import getBaseTowerProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characters, E_projectile } from '../../enum/index.js'
import { I_characterProperties, I_projectile, I_tower } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import { default as Fire, default as Projectile } from '../projectile/Fire.js'
import Tower from './index.js'
export default class FlyingObelisk extends Tower {
    constructor({
        position,
        offset = { x: 10, y: 50 },
        damage = 2000,
        attackSpeed = 5,
        attackRange = 300,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile,
    }: I_tower) {
        const baseTowerProperties: I_characterProperties = getBaseTowerProperties(E_characters.FLYING_OBELISK)
        super({
            name: 'Flying Obelisk Tower',
            type: E_characters.FLYING_OBELISK,
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
            multipleTarget: 1,
            placementTile,
        })
    }
    public static prices = 10
    public createProjectiles(targetEnemies: Enemy[]): Projectile[] {
        return targetEnemies.map((enemy) => {
            const projectileOptions: I_projectile = {
                position: {
                    x: enemy.position.x + enemy.width / 2,
                    y: enemy.position.y,
                },
                damage: this.data.damage,
                enemy,
                offset: { x: 220, y: 0 },
            }
            return this.createProjectile(projectileOptions, this.data.projectileType)
        })
    }
    private createProjectile(projectileOptions: I_projectile, type: E_projectile): Projectile {
        switch (type) {
            case E_projectile.FIRE:
                return new Fire(projectileOptions)
            default:
                return new Fire(projectileOptions)
        }
    }
}
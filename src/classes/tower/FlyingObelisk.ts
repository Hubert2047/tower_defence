import getBaseTowerProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js'
import { I_characterProperties, I_tower } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import { default as Fire, default as Projectile } from '../projectile/Fire.js'
import Tower from './index.js'
export default class FlyingObelisk extends Tower {
    action: E_characterActions
    constructor({
        position,
        offset = { x: 15, y: 50 },
        damage = 2000,
        attackSpeed = 45,
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
            attackTargetNums: 1,
            placementTile,
        })
        this.action = E_characterActions.ATTACK
    }
    public static prices = 10
    public createProjectiles(targetEnemis: Enemy[]): Projectile[] {
        return targetEnemis.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: enemy.position.x + enemy.width / 2,
                    y: enemy.position.y,
                },
                damage: this.damage,
                enemy,
                offset: { x: 220, y: 0 },
            }
            return new Fire(projectileOptions)
        })
    }
}

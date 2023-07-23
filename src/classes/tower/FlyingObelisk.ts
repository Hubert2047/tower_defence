import getBaseTowerProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characters, E_projectile, E_towerAttackProperties } from '../../enum/index.js'
import { I_characterProperties, I_projectile, I_tower } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import { default as Fire, default as Projectile } from '../projectile/Fire.js'
import Tower from './index.js'
export default class FlyingObelisk extends Tower {
    constructor({
        position,
        offset = { x: 15, y: 50 },
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile,
    }: I_tower) {
        const baseTowerProperties: I_characterProperties = getBaseTowerProperties(E_characters.FLYING_OBELISK)
        const data = {
            [E_towerAttackProperties.ATTACK_DAMAGE]: {
                currentLv: 0,
                value: 2000,
            },
            [E_towerAttackProperties.ATTACK_SPEED]: {
                currentLv: 0,
                value: 45,
            },
            [E_towerAttackProperties.ATTACK_RANGE]: {
                currentLv: 0,
                value: 300,
            },
            [E_towerAttackProperties.ATTACK_MULTI]: {
                currentLv: 0,
                value: 1,
            },
            [E_towerAttackProperties.PROJECTILE]: {
                currentLv: 0,
                value: E_projectile.FIRE,
            },
        }
        super({
            name: 'Flying Obelisk Tower',
            type: E_characters.FLYING_OBELISK,
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            initFrames: baseTowerProperties.initFrames,
            data,
            behaviorKey,
            angelKey,
            opacity,
            placementTile,
        })
        this.displayLevelUpTower = this.createTowerDisplayLevelUp({ width: 90, height: 150, offset: { x: 15, y: -20 } })
    }
    public static prices = 10
    public createProjectiles(targetEnemies: Enemy[]): Projectile[] {
        return targetEnemies.map((enemy) => {
            const projectileOptions: I_projectile = {
                position: {
                    x: enemy.position.x + enemy.width / 2,
                    y: enemy.position.y,
                },
                damage: this.data[E_towerAttackProperties.ATTACK_DAMAGE].value,
                enemy,
                offset: { x: 220, y: 0 },
            }
            return this.createProjectile(projectileOptions, this.data[E_towerAttackProperties.PROJECTILE].value)
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

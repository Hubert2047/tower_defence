import Thunder from '../../classes/projectile/Thunder.js'
import getBaseTowerProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js'
import { I_characterProperties, I_tower } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import Projectile from '../projectile/index.js'
import Tower from './index.js'

export default class ObeliskThunderTower extends Tower {
    baseTowerProperties: I_characterProperties
    action: E_characterActions
    constructor({
        position,
        offset = { x: 10, y: 55 },
        damage = 3000,
        attackSpeed = 2,
        attackRange = 300,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile,
    }: I_tower) {
        const baseTowerProperties: I_characterProperties = getBaseTowerProperties(E_characters.OBELISK_THUNDER)

        super({
            name: 'Obelisk Thunder Tower',
            type: E_characters.OBELISK_THUNDER,
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
            placementTile,
        })
        this.baseTowerProperties = baseTowerProperties
        this.action = E_characterActions.ATTACK
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
        const offset = { x: 50, y: -20 }
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: enemy.position.x + (enemy.width - 2 * enemy.offset.x) / 2 - (width - 2 * offset.x) / 2,
                    y: enemy.position.y,
                },
                damage: this.damage,
                enemy,
                width,
                height,
                offset,
            }
            return new Thunder(projectileOptions)
        })
    }
}

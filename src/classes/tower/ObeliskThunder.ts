import Thunder from '../../classes/projectile/Thunder.js'
import getBaseTowerProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characters, E_projectile, E_towerAttackProperties } from '../../enum/index.js'
import { I_characterProperties, I_tower } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import Projectile from '../projectile/index.js'
import Tower from './index.js'

export default class ObeliskThunderTower extends Tower {
    baseTowerProperties: I_characterProperties
    constructor({
        position,
        offset = { x: 10, y: 55 },
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile,
    }: I_tower) {
        const baseTowerProperties: I_characterProperties = getBaseTowerProperties(E_characters.OBELISK_THUNDER)
        const data = {
            [E_towerAttackProperties.ATTACK_DAMAGE]: {
                currentLv: 0,
                value: 3000,
            },
            [E_towerAttackProperties.ATTACK_SPEED]: {
                currentLv: 0,
                value: 40,
            },
            [E_towerAttackProperties.ATTACK_RANGE]: {
                currentLv: 0,
                value: 300,
            },
            [E_towerAttackProperties.ATTACK_MULTI]: {
                currentLv: 0,
                value: 3,
            },
            [E_towerAttackProperties.PROJECTILE]: {
                currentLv: 0,
                value: E_projectile.THUNDER,
            },
        }
        super({
            name: 'Obelisk Thunder Tower',
            type: E_characters.OBELISK_THUNDER,
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
        this.baseTowerProperties = baseTowerProperties
        this.displayLevelUpTower = this.createTowerDisplayLevelUp({ width: 90, height: 180, offset: { x: 10, y: -20 } })
    }
    public static prices = 20
    public update({
        enemies,
        shootingAudio,
        isDisplayAttackRangeCircleAndLevelUp,
    }: {
        enemies: Enemy[]
        shootingAudio: HTMLAudioElement | HTMLElement | null
        isDisplayAttackRangeCircleAndLevelUp: boolean
    }): void {
        super.update({
            enemies,
            shootingAudio,
            isDisplayAttackRangeCircleAndLevelUp,
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
                damage: this.data[E_towerAttackProperties.ATTACK_DAMAGE].value,
                enemy,
                width,
                height,
                offset,
            }
            return new Thunder(projectileOptions)
        })
    }
}

import { I_character, I_gemProperties } from 'src/types/interface.js'
import getBaseGemProperties from '../../data/baseProperties/gems/index.js'
import { E_angels, E_behaviors, E_characterRoles, E_characters, E_gems } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_plant, T_position } from '../../types/index.js'
import DestroyExplosion from '../explosionProjectile/Destroy.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import Gem from '../gems/index.js'
import LevelUpIcon from '../levelUpIcon/index.js'
import PlacementTile from '../placementTile/index.js'
import Sprite from '../sprite/index.js'
export default class Plant extends Sprite implements I_character {
    behaviorKey: E_behaviors
    angelKey: E_angels
    fruitingDuration: number
    countCreateGemIndex: number
    currentGemProperties: I_gemProperties
    gems: Gem[]
    type: E_characters
    spawGemType: E_gems
    role: E_characterRoles.PLANTED
    public placementTile: PlacementTile
    public beingDestroyed: boolean
    public destroyExplosion: DestroyExplosion
    public spawGemPerTime: number
    public levelUpIcon: LevelUpIcon
    constructor({
        position,
        width,
        height,
        fruitingDuration,
        initFrames,
        offset = { x: 0, y: 0 },
        type,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        spawGemType,
        opacity = 1,
        placementTile,
        spawGemPerTime,
    }: T_plant) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width, height, offset, opacity })
        this.angelKey = angelKey
        this.behaviorKey = behaviorKey
        this.fruitingDuration = fruitingDuration
        this.type = type
        this.countCreateGemIndex = 0
        this.currentGemProperties = getBaseGemProperties(spawGemType)
        this.gems = []
        this.spawGemType = spawGemType
        this.spawGemPerTime = spawGemPerTime
        this.placementTile = placementTile
        this.role = E_characterRoles.PLANTED
        this.beingDestroyed = false
        this.destroyExplosion = this.createDestroyExplosion()
        this.levelUpIcon = new LevelUpIcon({
            name: 'level up',
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 8, y: 30 },
            height: 80,
            width: 80,
            behaviorKey: E_behaviors.RUN,
        })
    }
    update(isDisplayLevelUp: boolean): { type: E_gems; value: number } | null {
        if (this.beingDestroyed) {
            this.destroyExplosion.update()
            return null
        } else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
            this.spawningGems()
            if (isDisplayLevelUp && this.gems.length <= 0) {
                this.levelUpIcon.update()
            }
            return this.getGems()
        }
    }
    spawningGems() {
        if (this.countCreateGemIndex > this.fruitingDuration / 2 && this.gems.length > 0) {
            this.gems[0].haveharvestGems = true
        }
        if (this.countCreateGemIndex < this.fruitingDuration) {
            this.countCreateGemIndex++
            return
        }
        this.countCreateGemIndex = 0
        const gemOptions = {
            position: { x: this.position.x, y: this.position.y + this.height - this.offset.y },
            gemType: this.spawGemType,
            fruitingDuration: this.fruitingDuration,
            gemNum: this.spawGemPerTime,
        }
        this.gems.push(new Gem(gemOptions))
    }
    public get isAlreadyDestroyed(): boolean {
        return this.destroyExplosion.hasFinishedAnimation && this.beingDestroyed
    }
    private createDestroyExplosion(): ExplosionProjectile {
        return new DestroyExplosion({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
        })
    }
    getGems() {
        let gem: { type: E_gems; value: number } = { type: this.spawGemType, value: 0 }
        for (let i = this.gems.length - 1; i >= 0; i--) {
            if (this.gems[i].hasHitTarget) {
                gem.value = this.spawGemPerTime
                this.gems.splice(i, 1)
            } else {
                this.gems[i].update()
            }
        }
        return gem
    }
    public hasCollision(position: T_position): boolean {
        return (
            this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width &&
            this.position.y <= position.y &&
            position.y <= this.position.y + this.height - this.offset.y
        )
    }
}

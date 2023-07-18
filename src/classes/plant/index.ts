import { I_character, I_gemProperties } from 'src/types/interface.js'
import getBaseGemProperties from '../../data/baseProperties/gems/index.js'
import { E_angels, E_behaviors, E_characterActions, E_characters, E_gems } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_plant, T_position, T_sprite } from '../../types/index.js'
import Gem from '../gems/index.js'
import PlacementTile from '../placementTile/index.js'
import Sprite from '../sprite/index.js'
export default class Plant extends Sprite implements I_character {
    behaviorKey: E_behaviors
    angelKey: E_angels
    fruitingDuration: number
    countCreateGemIndex: number
    currentGemProperties: I_gemProperties
    gemFrames: Map<string, Map<string, T_frame>>
    gems: Gem[]
    type: E_characters
    spawGemType: E_gems
    action: E_characterActions
    public placementTile: PlacementTile
    public levelUp: Sprite

    constructor({
        position,
        width,
        height,
        fruitingDuration = 10,
        initFrames,
        offset = { x: 0, y: 0 },
        type,
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        spawGemType,
        opacity = 1,
        placementTile,
    }: T_plant) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width, height, offset, opacity })
        this.angelKey = angelKey
        this.behaviorKey = behaviorKey
        this.fruitingDuration = fruitingDuration
        this.type = type
        this.countCreateGemIndex = 0
        this.currentGemProperties = getBaseGemProperties(spawGemType)
        this.gemFrames = createFrames({ initFrames: this.currentGemProperties.initFrames })
        this.gems = []
        this.spawGemType = spawGemType
        this.action = E_characterActions.PLANTED
        this.placementTile = placementTile
        this.levelUp = this.createLeveUpIcon()
    }
    update(isDisplayLevelUp: boolean): { type: E_gems; value: number } {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.spawningGems()
        if (isDisplayLevelUp) {
            this.levelUp.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        }
        return this.getGems()
    }
    private createLeveUpIcon() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/level-up.png',
                    maxX: 5,
                    maxY: 3,
                    holdTime: 4,
                },
            },
        }

        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 8, y: 30 },
            height: 80,
            width: 80,
        }
        return new Sprite(options)
    }
    spawningGems() {
        if (this.countCreateGemIndex < this.fruitingDuration) {
            this.countCreateGemIndex++
            return
        }
        this.countCreateGemIndex = 0
        const gemOptions = {
            position: { x: this.position.x, y: this.position.y + this.height - this.offset.y },
            frames: this.gemFrames,
            gemType: this.spawGemType,
            fruitingDuration: this.fruitingDuration,
        }
        this.gems.push(new Gem(gemOptions))
    }
    getGems() {
        let gem = { type: this.spawGemType, value: 0 }
        for (let i = this.gems.length - 1; i >= 0; i--) {
            if (this.gems[i].hasHitTarget) {
                gem.value = 2
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

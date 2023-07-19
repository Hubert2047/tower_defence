import getBasePlantProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characters, E_gems } from '../../enum/index.js'
import { I_characterProperties, I_plant } from '../../types/interface.js'
import Plant from './index.js'
export default class AutumnTree extends Plant {
    constructor({
        position,
        offset = { x: 10, y: 54 },
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        fruitingDuration = 4000,
        placementTile,
        spawGemPerTime = 1,
    }: I_plant) {
        const baseTowerProperties: I_characterProperties = getBasePlantProperties(E_characters.AUTUMN_TREE)
        super({
            name: 'Autumn TREE',
            type: E_characters.AUTUMN_TREE,
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            initFrames: baseTowerProperties.initFrames,
            fruitingDuration,
            behaviorKey,
            angelKey,
            opacity,
            spawGemType: E_gems.PURPLE,
            placementTile,
            spawGemPerTime,
        })
    }
    public static prices = 55
}

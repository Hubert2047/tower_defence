import getBasePlantProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characters, E_gems } from '../../enum/index.js'
import { I_characterProperties, I_plant } from '../../types/interface.js'
import Plant from './index.js'
export default class GreenTree extends Plant {
    constructor({
        position,
        offset = { x: 10, y: 65 },
        behaviorKey = E_behaviors.IDLE,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        fruitingDuration = 1000,
        placementTile,
        spawGemPerTime = 2,
    }: I_plant) {
        const baseTowerProperties: I_characterProperties = getBasePlantProperties(E_characters.GREEN_TREE)
        super({
            name: 'GREEN TREE',
            type: E_characters.GREEN_TREE,
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            initFrames: baseTowerProperties.initFrames,
            fruitingDuration,
            behaviorKey,
            angelKey,
            opacity,
            spawGemType: E_gems.BLUE,
            placementTile,
            spawGemPerTime,
        })
    }
    public static prices = 10
}

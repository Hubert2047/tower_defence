import getBasePlantProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characterActions, E_characters, E_gems } from '../../enum/index.js';
import Plant from './index.js';
class AutumnTree extends Plant {
    constructor({ position, offset = { x: 10, y: 54 }, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, fruitingDuration = 500, placementTile = null, }) {
        const baseTowerProperties = getBasePlantProperties(E_characters.AUTUMN_TREE);
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
        });
        this.action = E_characterActions.PLANTED;
    }
}
AutumnTree.prices = 15;
export default AutumnTree;

import getBasePlantProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characterActions, E_characters, E_gems } from '../../enum/index.js';
import Plant from './index.js';
class MonsterraTree extends Plant {
    constructor({ position, offset = { x: 15, y: 70 }, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, fruitingDuration = 500, placementTile = null, }) {
        const baseTowerProperties = getBasePlantProperties(E_characters.MONSTERRA_TREE);
        super({
            name: 'Monsterra Tree',
            type: E_characters.MONSTERRA_TREE,
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            initFrames: baseTowerProperties.initFrames,
            fruitingDuration,
            behaviorKey,
            angelKey,
            opacity,
            spawGemType: E_gems.RED,
            placementTile,
        });
        this.action = E_characterActions.PLANTED;
    }
}
MonsterraTree.prices = 15;
export default MonsterraTree;

import getBasePlantProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characters, E_gems } from '../../enum/index.js';
import Plant from './index.js';
class MonsterraTree extends Plant {
<<<<<<< HEAD
    constructor({ position, offset = { x: 14, y: 60 }, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, fruitingDuration = 500, placementTile, }) {
=======
    constructor({ position, offset = { x: 15, y: 70 }, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, fruitingDuration = 500, placementTile, spawGemPerTime = 2, }) {
>>>>>>> 521296cf130c5ee307184f5805f09658ea35947e
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
            spawGemPerTime,
        });
    }
}
MonsterraTree.prices = 15;
export default MonsterraTree;

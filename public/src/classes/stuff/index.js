import getBasePlantProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characters } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
class Stuff extends Sprite {
    constructor({ name, position, type, offset = { x: 10, y: 54 }, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, }) {
        const baseTowerProperties = getBasePlantProperties(E_characters.SHOVEL);
        const frames = createFrames({ initFrames: baseTowerProperties.initFrames });
        super({
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            opacity,
            frames,
        });
        this.name = name;
        this.type = type;
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
    }
}
Stuff.prices = 0;
export default Stuff;

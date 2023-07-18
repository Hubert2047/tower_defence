import getBasePlantProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characterRoles, E_characters } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
class Shovel extends Sprite {
    constructor({ position, offset = { x: 10, y: 54 }, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, }) {
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
        this.name = 'shovel';
        this.type = E_characters.SHOVEL;
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
        this.role = E_characterRoles.DESTROY;
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
}
Shovel.prices = 5;
export default Shovel;

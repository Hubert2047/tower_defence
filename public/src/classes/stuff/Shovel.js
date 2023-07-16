import getBasePlantProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
class Stuff extends Sprite {
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
        this.action = E_characterActions.ATTACK;
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
}
Stuff.prices = 5;
export default Stuff;

import { E_angels, E_behaviors } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class Border extends Sprite {
    constructor({ name, position, offset = { x: 0, y: 0 }, initFrames, width = 64, height = 64, }) {
        const frames = createFrames({ initFrames });
        super({
            position,
            offset,
            width,
            height,
            frames,
        });
        this.name = name;
    }
    update() {
        this.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
    }
}

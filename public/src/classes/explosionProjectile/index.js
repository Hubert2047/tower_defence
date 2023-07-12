import { E_angels, E_behaviors } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class ExplosionProjectile extends Sprite {
    constructor({ name, explosionType, position, offset = { x: 0, y: 0 }, initFrames, width = 50, height = 50, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames });
        this.name = name;
        this.explosionType = explosionType;
    }
    update() {
        this.draw({ behaviorKey: E_behaviors.ATTACK, angelKey: E_angels.ANGEL_0 });
    }
}

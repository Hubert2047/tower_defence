import { E_angels, E_behaviors } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class ExplosionProjectile extends Sprite {
    constructor({ name, explosionType, position, offset = { x: 0, y: 0 }, initFrames, width = 50, height = 50, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames });
        this.name = name;
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
        this.explosionType = explosionType;
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    get hasFinishedAnimation() {
        const currentExplosionFrame = this.currentFrame;
        if (!currentExplosionFrame)
            return true;
        return (this.cropPosition.x === currentExplosionFrame.maxX - 1 &&
            this.cropPosition.y === currentExplosionFrame.maxY - 1);
    }
}

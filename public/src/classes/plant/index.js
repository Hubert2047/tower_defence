import getBaseGemProperties from '../../data/baseProperties/gems/index.js';
import { E_angels, E_behaviors, E_characterActions } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Gem from '../gems/index.js';
import Sprite from '../sprite/index.js';
export default class Plant extends Sprite {
    constructor({ position, width, height, fruitingDuration = 10, initFrames, offset = { x: 0, y: 0 }, type, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, spawGemType, opacity = 1, placementTile, }) {
        const frames = createFrames({ initFrames });
        super({ position, frames, width, height, offset, opacity });
        this.angelKey = angelKey;
        this.behaviorKey = behaviorKey;
        this.fruitingDuration = fruitingDuration;
        this.type = type;
        this.countCreateGemIndex = 0;
        this.currentGemProperties = getBaseGemProperties(spawGemType);
        this.gemFrames = createFrames({ initFrames: this.currentGemProperties.initFrames });
        this.gems = [];
        this.spawGemType = spawGemType;
        this.action = E_characterActions.PLANTED;
        this.placementTile = placementTile;
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        this.spawningGems();
        return this.getGems();
    }
    spawningGems() {
        if (this.countCreateGemIndex < this.fruitingDuration) {
            this.countCreateGemIndex++;
            return;
        }
        this.countCreateGemIndex = 0;
        const gemOptions = {
            position: { x: this.position.x, y: this.position.y + this.height - this.offset.y },
            frames: this.gemFrames,
            gemType: this.spawGemType,
            fruitingDuration: this.fruitingDuration,
        };
        this.gems.push(new Gem(gemOptions));
    }
    getGems() {
        let gem = { type: this.spawGemType, value: 0 };
        for (let i = this.gems.length - 1; i >= 0; i--) {
            if (this.gems[i].hasHitTarget) {
                gem.value = 2;
                this.gems.splice(i, 1);
            }
            else {
                this.gems[i].update();
            }
        }
        return gem;
    }
    hasCollision(position) {
        return (this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width &&
            this.position.y <= position.y &&
            position.y <= this.position.y + this.height - this.offset.y);
    }
}

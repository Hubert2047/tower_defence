import getBaseGemProperties from '../../data/baseProperties/gems/index.js';
import { E_angels, E_behaviors, E_characterRoles } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import DestroyExplosion from '../explosionProjectile/Destroy.js';
import Gem from '../gems/index.js';
import Sprite from '../sprite/index.js';
export default class Plant extends Sprite {
    constructor({ position, width, height, fruitingDuration, initFrames, offset = { x: 0, y: 0 }, type, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, spawGemType, opacity = 1, placementTile, spawGemPerTime, }) {
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
        this.spawGemPerTime = spawGemPerTime;
        this.placementTile = placementTile;
<<<<<<< HEAD
        this.levelUp = this.createLeveUpIcon();
    }
    update(isDisplayLevelUp) {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        this.spawningGems();
        if (isDisplayLevelUp) {
            this.levelUp.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
        }
        return this.getGems();
=======
        this.role = E_characterRoles.PLANTED;
        this.beingDestroyed = false;
        this.destroyExplosion = this.createDestroyExplosion();
    }
    update() {
        if (this.beingDestroyed) {
            this.destroyExplosion.update();
            return null;
        }
        else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
            this.spawningGems();
            return this.getGems();
        }
>>>>>>> 521296cf130c5ee307184f5805f09658ea35947e
    }
    createLeveUpIcon() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/level-up.png',
                    maxX: 5,
                    maxY: 3,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 8, y: 30 },
            height: 80,
            width: 80,
        };
        return new Sprite(options);
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
    get isAlreadyDestroyed() {
        return this.destroyExplosion.hasFinishedAnimation && this.beingDestroyed;
    }
    createDestroyExplosion() {
        return new DestroyExplosion({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
        });
    }
    getGems() {
        let gem = { type: this.spawGemType, value: 0 };
        for (let i = this.gems.length - 1; i >= 0; i--) {
            if (this.gems[i].hasHitTarget) {
                gem.value = this.spawGemPerTime;
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

import { BLUE_GEM_POSITION, RED_GEM_POSITION, YELLOW_GEM_POSITION } from '../../constants/index.js';
import context2D from '../../context2D/index.js';
import getBaseGemProperties from '../../data/baseProperties/gems/index.js';
import { E_angels, E_behaviors, E_gems } from '../../enum/index.js';
import { drawText, getVectorNomalized } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class Gem extends Sprite {
    constructor({ position, gemType, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, offset, frames, gemNum, moveSpeed = 100, opacity = 1, }) {
        const currentGemProperties = getBaseGemProperties(gemType);
        super({
            position,
            frames,
            width: currentGemProperties.width,
            height: currentGemProperties.height,
            offset,
            opacity,
        });
        this.angelKey = angelKey;
        this.behaviorKey = behaviorKey;
        this.gemType = gemType;
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.targetPosition = this.findTargetPosition();
        this.gemNum = gemNum;
        this.haveharvestGems = false;
    }
    get hasHitTarget() {
        return this.position.x === this.targetPosition.x && this.position.y === this.targetPosition.y;
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        if (context2D) {
            const textString = `+${this.gemNum.toString()}`;
            const textWidth = context2D.measureText(textString).width;
            const textOptions = {
                text: textString,
                position: {
                    x: this.position.x + this.width - textWidth / 2,
                    y: this.position.y - this.height + 10,
                },
                color: 'white',
                fontSize: 16,
            };
            drawText(textOptions);
        }
        if (this.hasHitTarget)
            return;
        if (this.haveharvestGems) {
            this.opacity = 0.5;
            this.updatePosition();
        }
    }
    findTargetPosition() {
        switch (this.gemType) {
            case E_gems.BLUE:
                return BLUE_GEM_POSITION;
            case E_gems.RED:
                return RED_GEM_POSITION;
            case E_gems.PURPLE:
                return YELLOW_GEM_POSITION;
            default:
                return BLUE_GEM_POSITION;
        }
    }
    updatePosition() {
        this.updateVelocity();
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
        if (this.position.x >= this.targetPosition.x && this.velocityX > 0) {
            this.position.x = this.targetPosition.x;
        }
        if (this.position.y >= this.targetPosition.y && this.velocityY > 0) {
            this.position.y = this.targetPosition.y;
        }
    }
    hasCollision(mouse) {
        return (this.position.x <= mouse.x &&
            mouse.x <= this.position.x + this.width &&
            this.position.y - 30 <= mouse.y &&
            mouse.y <= this.position.y - 30 + this.height);
    }
    updateVelocity() {
        const v_normalized = getVectorNomalized(this.position, this.targetPosition);
        this.velocityX = (this.moveSpeed / 10) * v_normalized.x;
        this.velocityY = (this.moveSpeed / 10) * v_normalized.y;
    }
}

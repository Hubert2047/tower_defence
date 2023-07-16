import { TILE_SIZE } from '../../constants/index.js';
import { E_angels, E_behaviors, E_characterActions } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class PlacementTile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, behaviorKey = E_behaviors.IDLE, offset = { x: 0, y: 64 }, angelKey = E_angels.ANGEL_0, }) {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/stuff/placement-tile.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 300000,
                },
            },
        };
        const frames = createFrames({ initFrames });
        super({
            position,
            frames,
            width: 64,
            height: 64,
            opacity: 1,
            offset,
        });
        this.position = position;
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
        this.isOccupied = false;
    }
    update(activeDashboardCharacter, mouse) {
        const isDestroyAction = (activeDashboardCharacter === null || activeDashboardCharacter === void 0 ? void 0 : activeDashboardCharacter.action) === E_characterActions.DESTROY;
        const isDestroy = isDestroyAction;
        if (isDestroy && !this.isOccupied)
            return;
        if (!activeDashboardCharacter && !this.isOccupied)
            return;
        if (this.hasCollision(mouse) && activeDashboardCharacter && !this.isOccupied) {
            this.opacity = 1;
        }
        else {
            this.opacity = 0.4;
        }
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    hasCollision(position) {
        return (this.position.x <= position.x &&
            position.x <= this.position.x + TILE_SIZE &&
            this.position.y <= position.y &&
            position.y <= this.position.y + TILE_SIZE);
    }
}

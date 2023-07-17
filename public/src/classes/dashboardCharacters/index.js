import Sprite from '../../classes/sprite/index.js';
import getBaseCharacterProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js';
import { createFrames } from '../../helper/index.js';
export default class DashboardCharacter extends Sprite {
    constructor({ type, position, offset, width, height, angelKey = E_angels.ANGEL_0, behaviorKey = E_behaviors.IDLE, isDashboardShadow, opacity = 1, }) {
        const baseCharacterProperties = getBaseCharacterProperties(type);
        const frames = createFrames({
            initFrames: baseCharacterProperties.initFrames,
        });
        super({
            position,
            offset,
            width,
            height,
            frames,
            opacity,
        });
        if (!isDashboardShadow) {
            this.dashboardShadow = this.createDashboardShadow({
                type,
                position,
            });
        }
        this.type = type;
        this.baseCharacterProperties = baseCharacterProperties;
        this.angelKey = angelKey;
        this.behaviorKey = behaviorKey;
        this.action = this.getCharacterAction(type);
    }
    createDashboardShadow({ type, position }) {
        const baseCharacterProperties = getBaseCharacterProperties(type);
        const characterOptions = {
            type,
            position,
            offset: { x: baseCharacterProperties.width / 2, y: baseCharacterProperties.height / 2 },
            width: baseCharacterProperties.width,
            height: baseCharacterProperties.height,
            isDashboardShadow: true,
            opacity: 0.8,
        };
        return new DashboardCharacter(characterOptions);
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    hasCollision(mouse) {
        return (this.position.x + this.offset.x <= mouse.x &&
            mouse.x <= this.position.x + this.width - this.offset.x &&
            this.position.y - this.height + this.offset.y <= mouse.y &&
            mouse.y <= this.position.y + this.height - 3 * this.offset.y);
    }
    getCharacterAction(type) {
        switch (type) {
            case E_characters.AUTUMN_TREE:
                return E_characterActions.PLANTED;
            case E_characters.GREEN_TREE:
                return E_characterActions.PLANTED;
            case E_characters.MONSTERRA_TREE:
                return E_characterActions.PLANTED;
            case E_characters.BLOOD_MOON:
                return E_characterActions.ATTACK;
            case E_characters.OBELISK_THUNDER:
                return E_characterActions.ATTACK;
            case E_characters.FLYING_OBELISK:
                return E_characterActions.ATTACK;
            case E_characters.SHOVEL:
                return E_characterActions.DESTROY;
            default:
                return E_characterActions.PLANTED;
        }
    }
}

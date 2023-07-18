import Thunder from '../../classes/projectile/Thunder.js';
import getBaseTowerProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js';
import Tower from './index.js';
class ObeliskThunderTower extends Tower {
    constructor({ position, offset = { x: 10, y: 55 }, damage = 3000, attackSpeed = 40, attackRange = 300, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, placementTile, }) {
        const baseTowerProperties = getBaseTowerProperties(E_characters.OBELISK_THUNDER);
        super({
            name: 'Obelisk Thunder Tower',
            type: E_characters.OBELISK_THUNDER,
            position,
            offset,
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            initFrames: baseTowerProperties.initFrames,
            damage,
            attackSpeed,
            attackRange,
            behaviorKey,
            angelKey,
            opacity,
            attackTargetNums: 3,
            placementTile,
        });
        this.baseTowerProperties = baseTowerProperties;
        this.action = E_characterActions.ATTACK;
    }
    update({ enemies, shootingAudio, isDisplayAttackRangeCircle, }) {
        super.update({
            enemies,
            shootingAudio,
            isDisplayAttackRangeCircle,
        });
        if (this.behaviorKey === E_behaviors.ATTACK) {
            this.width = this.baseTowerProperties.width;
            this.height = 160;
        }
        else {
            this.width = this.baseTowerProperties.width;
            this.height = this.baseTowerProperties.height;
        }
    }
    createProjectiles(targetEnemies) {
        const width = 80;
        const height = 130;
        const offset = { x: 50, y: -20 };
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: enemy.position.x + (enemy.width - 2 * enemy.offset.x) / 2 - (width - 2 * offset.x) / 2,
                    y: enemy.position.y,
                },
                damage: this.damage,
                enemy,
                width,
                height,
                offset,
            };
            return new Thunder(projectileOptions);
        });
    }
}
ObeliskThunderTower.prices = 20;
export default ObeliskThunderTower;

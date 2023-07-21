import getBaseTowerProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characters, E_towerAttackProperties } from '../../enum/index.js';
import NuclearProjectile from '../projectile/Nuclear.js';
import Tower from './index.js';
class BloodMoonTower extends Tower {
    constructor({ position, offset = { x: 10, y: 60 }, damage = 1000, attackSpeed = 54, attackRange = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, opacity = 1, placementTile, }) {
        const baseTowerProperties = getBaseTowerProperties(E_characters.BLOOD_MOON);
        super({
            name: 'Blood Moon Tower',
            type: E_characters.BLOOD_MOON,
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
            placementTile,
        });
        this.displayLevelUpTower = this.createTowerDisplayLevelUp({ width: 90, height: 150, offset: { x: 10, y: -10 } });
    }
    createProjectiles(targetEnemies) {
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y,
                },
                damage: this.data[E_towerAttackProperties.ATTACK_DAMAGE].value,
                enemy,
                offset: { x: 25, y: -40 },
            };
            return new NuclearProjectile(projectileOptions);
        });
    }
}
BloodMoonTower.prices = 10;
export default BloodMoonTower;

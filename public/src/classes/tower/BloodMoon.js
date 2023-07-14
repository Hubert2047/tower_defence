import getBaseTowerProperties from '../../data/baseProperties/towers/index.js';
import { E_angels, E_behaviors, E_tower } from '../../enum/index.js';
import NuclearProjectile from '../projectile/Nuclear.js';
import Tower from './index.js';
class BloodMoonTower extends Tower {
    constructor({ position, offset = { x: 10, y: 60 }, damage = 1000, attackSpeed = 5, attackRange = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, opacity = 1, }) {
        const baseTowerProperties = getBaseTowerProperties(E_tower.BLOOD_MOON);
        super({
            name: 'Blood Moon Tower',
            towerType: E_tower.BLOOD_MOON,
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
        });
    }
    createProjectiles(targetEnemies) {
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y,
                },
                damage: this.damage,
                enemy,
                offset: { x: 25, y: -40 },
            };
            return new NuclearProjectile(projectileOptions);
        });
    }
}
BloodMoonTower.prices = 10;
export default BloodMoonTower;

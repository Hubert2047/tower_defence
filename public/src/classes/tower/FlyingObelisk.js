import getBaseTowerProperties from '../../data/baseProperties/towers/index.js';
import { E_angels, E_behaviors, E_tower } from '../../enum/index.js';
import { default as Fire } from '../projectile/Fire.js';
import Tower from './index.js';
class FlyingObelisk extends Tower {
    constructor({ position, offset = { x: 10, y: 50 }, damage = 2000, attackSpeed = 4, attackRange = 300, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, }) {
        const baseTowerProperties = getBaseTowerProperties(E_tower.FLYING_OBELISK);
        super({
            name: 'Flying Obelisk Tower',
            towerType: E_tower.FLYING_OBELISK,
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
            attackTargetNums: 1,
        });
    }
    createProjectiles(targetEnemis) {
        return targetEnemis.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: enemy.position.x + enemy.width / 2,
                    y: enemy.position.y,
                },
                damage: this.damage,
                enemy,
                offset: { x: 220, y: 0 },
            };
            return new Fire(projectileOptions);
        });
    }
}
FlyingObelisk.prices = 10;
export default FlyingObelisk;

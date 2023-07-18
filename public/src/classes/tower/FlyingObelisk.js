import getBaseTowerProperties from '../../data/baseProperties/characters/index.js';
import { E_angels, E_behaviors, E_characters, E_projectile } from '../../enum/index.js';
import { default as Fire } from '../projectile/Fire.js';
import Tower from './index.js';
class FlyingObelisk extends Tower {
    constructor({ position, offset = { x: 15, y: 50 }, damage = 2000, attackSpeed = 45, attackRange = 300, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_0, opacity = 1, placementTile, }) {
        const baseTowerProperties = getBaseTowerProperties(E_characters.FLYING_OBELISK);
        super({
            name: 'Flying Obelisk Tower',
            type: E_characters.FLYING_OBELISK,
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
            multipleTarget: 1,
            placementTile,
        });
    }
    createProjectiles(targetEnemies) {
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: enemy.position.x + enemy.width / 2,
                    y: enemy.position.y,
                },
                damage: this.data.damage,
                enemy,
                offset: { x: 220, y: 0 },
            };
            return this.createProjectile(projectileOptions, this.data.projectileType);
        });
    }
    createProjectile(projectileOptions, type) {
        switch (type) {
            case E_projectile.FIRE:
                return new Fire(projectileOptions);
            default:
                return new Fire(projectileOptions);
        }
    }
}
FlyingObelisk.prices = 10;
export default FlyingObelisk;

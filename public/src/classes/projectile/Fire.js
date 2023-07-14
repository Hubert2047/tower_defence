import ThunderExplosion from '../../classes/explosionProjectile/Thunder.js';
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js';
import Projectile from './index.js';
export default class FireProjectile extends Projectile {
    constructor({ position, enemy, offset = { x: 0, y: 0 }, width = 40, height = 40, moveSpeed = 5, damage = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, }) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                    maxX: 9,
                    maxY: 8,
                    holdTime: 10,
                },
            },
        };
        super({
            name: 'Fire Projectile',
            projectileType: E_projectile.FIRE,
            position,
            initFrames,
            enemy,
            offset,
            width,
            height,
            moveSpeed,
            damage,
            behaviorKey,
            angelKey,
        });
        this.name = 'Fire Projectile';
    }
    createExplosion() {
        let explosionOptions = {
            position: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
        };
        return new ThunderExplosion(explosionOptions);
    }
}

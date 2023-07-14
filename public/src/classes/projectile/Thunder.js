import ThunderExplosion from '../../classes/explosionProjectile/Thunder.js';
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js';
import Projectile from './index.js';
export default class ThunderProjectile extends Projectile {
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
            name: 'Thunder',
            projectileType: E_projectile.THUNDER,
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
        this.name = 'Thunder';
    }
    update() {
        this.updatePosition();
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    updatePosition() {
        this.position.x = this.targetEnemy.position.x + this.targetEnemy.width / 2;
        this.position.y = this.targetEnemy.position.y + this.targetEnemy.height / 2;
    }
    get canHitEnemy() {
        const currentProjectileFrame = this.currentFrame;
        if (!currentProjectileFrame)
            return true;
        return (this.cropPosition.x === currentProjectileFrame.maxX - 1 &&
            this.cropPosition.y === currentProjectileFrame.maxY - 1);
    }
    createExplosion() {
        let explosionOptions = {
            position: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
        };
        return new ThunderExplosion(explosionOptions);
    }
}

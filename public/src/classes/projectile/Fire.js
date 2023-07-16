import FireExplosion from '../../classes/explosionProjectile/Fire.js';
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js';
import Projectile from './index.js';
export default class FireProjectile extends Projectile {
    constructor({ position, enemy, offset = { x: 0, y: 0 }, width = 320, height = 200, moveSpeed = 3, damage = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, }) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire.png',
                    maxX: 8,
                    maxY: 8,
                    holdTime: 2,
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
        this.currentMove = 0;
    }
    update() {
        this.updatePosition();
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    updatePosition() {
        this.currentMove += 6;
        this.position.x = this.targetEnemy.position.x + this.targetEnemy.width / 2;
        this.position.y = this.targetEnemy.position.y - this.targetEnemy.position.y / 4 + this.currentMove;
    }
    get canHitEnemy() {
        return this.position.y > this.targetEnemy.position.y;
    }
    createExplosion() {
        let explosionOptions = {
            position: {
                x: this.position.x + this.offset.x,
                y: this.position.y - this.offset.y,
            },
            offset: { x: 300, y: -60 },
        };
        return new FireExplosion(explosionOptions);
    }
}

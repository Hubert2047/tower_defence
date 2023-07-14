import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js';
import ExplosionProjectile from './index.js';
export default class FireExplosion extends ExplosionProjectile {
    constructor({ position, offset = { x: 0, y: 0 }, width = 100, height = 100, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, }) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/explosions/fire/fire.png',
                    maxX: 12,
                    maxY: 1,
                    holdTime: 3,
                },
            },
        };
        super({
            name: 'Fire Explosion',
            explosionType: E_explosion.FIRE,
            position,
            initFrames,
            offset,
            width,
            height,
            behaviorKey,
            angelKey,
        });
        this.name = 'Fire Explosion';
    }
}

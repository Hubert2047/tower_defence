import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js';
import ExplosionProjectile from './index.js';
export default class NuclearExplosion extends ExplosionProjectile {
    constructor({ position, offset = { x: 0, y: 0 }, width = 100, height = 100, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, }) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/explosions/nuclear/nuclear.png',
                    maxX: 5,
                    maxY: 2,
                    holdTime: 4,
                },
            },
        };
        super({
            name: 'Nuclear Explosion',
            explosionType: E_explosion.NUCLEAR,
            position,
            initFrames,
            offset,
            width,
            height,
            behaviorKey,
            angelKey,
        });
        this.name = 'Nuclear Explosion';
    }
}

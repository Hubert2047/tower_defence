import { createImageSources } from '../../helper/index.js';
import Projectile from './index.js';
export default class BloodMoonProjectile extends Projectile {
    constructor({ position = { x: 0, y: 0 }, damage = 50, moveSpeed = 2, enemy }) {
        const sources = ['../../public/src/assets/images/projectiles/fire_ball_3.png'];
        const imageSources = createImageSources(sources);
        const offset = { x: -60, y: 30 };
        const width = 80;
        const height = 80;
        const frame = { maxX: 6, maxY: 5, holdTime: 3 };
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            frame,
            moveSpeed,
            damage,
            enemy,
        });
    }
}

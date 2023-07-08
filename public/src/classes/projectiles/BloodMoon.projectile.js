import { createImageSources } from '../../helper/index.js';
import Projectile from './index.js';
export default class BloodMoonProjectile extends Projectile {
    constructor({ position = { x: 0, y: 0 }, damage = 50, moveSpeed = 2, enemy }) {
        const sources = ['../../public/src/assets/images/Tower/BloodMoon/projectile_bloodmoon.png'];
        const imageSources = createImageSources(sources);
        const offset = { x: -60, y: 30 };
        const width = 100;
        const height = 30;
        const frame = { maxX: 1, maxY: 1, holdTime: 3 };
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

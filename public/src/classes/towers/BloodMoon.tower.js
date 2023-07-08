import { E_ProjectileType } from '../../enum/index.js';
import { createImageSources } from '../../helper/index.js';
import Tower from './index.js';
class BloodMoon extends Tower {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = ['../../public/src/assets/images/Tower/BloodMoon/tower_bloodmoon.png'];
        const imageSources = createImageSources(sources);
        const offset = { x: 20, y: 70 };
        const damage = 1000;
        const projectileType = E_ProjectileType.BLOOD_MOON;
        const attackSpeed = 5;
        const frame = { maxX: 11, maxY: 1, holdTime: 4 };
        super({
            position,
            offset,
            imageSources,
            frame,
            projectileType,
            attackSpeed,
            damage,
        });
    }
}
BloodMoon.prices = 10;
export default BloodMoon;

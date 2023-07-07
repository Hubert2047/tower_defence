import { createImageSources } from '../../helper/index.js';
import Tower from './index.js';
export default class BloodMoon extends Tower {
    constructor({ position = { x: 0, y: 0 } }) {
        const towerSourceString = ['../../public/src/assets/images/Tower/BloodMoon/tower_bloodmoon.png'];
        const projectileSourceString = ['../../public/src/assets/images/Tower/BloodMoon/projectile_bloodmoon.png'];
        const towerSources = createImageSources(towerSourceString);
        const projectileSources = createImageSources(projectileSourceString);
        super({
            position,
            imageSources: towerSources,
            projectileSources,
            frameMaxX: 11,
            frameMaxY: 1,
            offset: { x: 20, y: 70 },
        });
    }
}

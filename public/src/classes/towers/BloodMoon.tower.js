import { E_towerType } from '../../enum/index.js';
import { createImageSources, deepClone } from '../../helper/index.js';
import defaultProperty from '../towers/towers.default.propety.js';
import Tower from './index.js';
class BloodMoon extends Tower {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = ['../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png'];
        const imageSources = createImageSources(sources);
        const property = deepClone(defaultProperty.get(E_towerType.BLOOD_MOON));
        const { offset, maxX, maxY, attackSpeed, damage, projectileType, holdTime } = property;
        const frame = { maxX, maxY, holdTime };
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

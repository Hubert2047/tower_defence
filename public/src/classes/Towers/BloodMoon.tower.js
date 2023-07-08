import { createImageSources } from '../../helper/index.js';
import Tower from './index.js';
export default class BloodMoon extends Tower {
    constructor({ position = { x: 0, y: 0 } }) {
        const sources = ['../../public/src/assets/images/Tower/BloodMoon/tower_bloodmoon.png'];
        const imageSources = createImageSources(sources);
        const offset = { x: 20, y: 70 };
        const damage = 500;
        const attackSpeed = 5;
        const frame = { maxX: 11, maxY: 1, holdTime: 4 };
        super({
            position,
            offset,
            imageSources,
            frame,
            attackSpeed,
            damage,
        });
    }
}

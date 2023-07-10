import { createImageSources } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class Border extends Sprite {
    constructor({ name, position, offset = { x: 0, y: 0 }, imageSourceString, frame, width = 64, height = 64, }) {
        const imageSources = createImageSources(imageSourceString);
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            frame,
        });
        this.name = name;
    }
    update() {
        this.draw({ sourceIndex: 0 });
    }
}

import Sprite from '../../classes/sprite/index.js';
import { createFrames } from '../../helper/index.js';
export default class dashboardStuff extends Sprite {
    constructor({ position, width, height, initFrames }) {
        const frames = createFrames({ initFrames });
        super({ position, frames, width, height });
    }
}

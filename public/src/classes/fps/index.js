import { FPS } from '../../constants/index.js';
export default class RequestAnimationFrame {
    constructor({ loopFunction }) {
        this.loopFunction = loopFunction;
        this.lastTime = performance.now();
        this.currentTime = performance.now();
    }
    start({ gameMap }) {
        this.currentTime = performance.now();
        const distance = this.currentTime - this.lastTime;
        if (distance > 1000 / FPS) {
            this.loopFunction({ gameMap });
            this.lastTime = this.currentTime;
        }
        requestAnimationFrame(() => {
            this.start({ gameMap });
        });
    }
}

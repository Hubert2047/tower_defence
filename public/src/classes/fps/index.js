export default class RequestAnimationFrame {
    constructor({ loopFunction, fps }) {
        this.loopFunction = loopFunction;
        this.fps = fps;
        this.lastTime = Date.now();
        this.currentTime = Date.now();
    }
    start({ gameMap }) {
        this.currentTime = Date.now();
        const distance = this.currentTime - this.lastTime;
        if (distance > 1000 / this.fps) {
            this.loopFunction({ gameMap });
            this.lastTime = this.currentTime;
        }
        requestAnimationFrame(() => {
            this.start({ gameMap });
        });
    }
}

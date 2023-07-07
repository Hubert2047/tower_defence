import context2D from '../context2D/index.js';
export default class Sprite {
    constructor({ position = { x: 0, y: 0 }, width = 100, height = 100, imageSources, frameMaxX = 1, frameMaxY = 1, frameTime = 5, }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.frameMaxX = frameMaxX;
        this.frameMaxY = frameMaxY;
        this.frameTime = frameTime;
        this.imageSources = imageSources;
        this.cropPosition = { x: 0, y: 0 };
        // this.image = new Image()
        // this.image.src = imageSourcesrc
        this.countFrameTime = 0;
    }
    draw(sortIndex) {
        if (context2D) {
            context2D.drawImage(this.imageSources[sortIndex], (this.cropPosition.x * this.imageSources[sortIndex].width) / this.frameMaxX, (this.cropPosition.y * this.imageSources[sortIndex].height) / this.frameMaxY, this.imageSources[sortIndex].width / this.frameMaxX, this.imageSources[sortIndex].height / this.frameMaxY, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
            this.updateFrameIndex();
        }
    }
    updateFrameIndex() {
        this.countFrameTime++;
        if (this.countFrameTime === this.frameTime) {
            this.countFrameTime = 0;
            if (this.cropPosition.x === this.frameMaxX - 1 && this.cropPosition.y === this.frameMaxY - 1) {
                this.cropPosition = { x: 0, y: 0 };
            }
            else if (this.cropPosition.x === this.frameMaxX - 1) {
                this.cropPosition.x = 0;
                this.cropPosition.y++;
            }
            else {
                this.cropPosition.x++;
            }
        }
    }
}

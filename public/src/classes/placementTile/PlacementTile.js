import { TILE_SIZE } from '../../constants/index.js';
import context2D from '../../context2D/index.js';
export default class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position;
        this.defaultColor = 'rgba(255,255,255,0.2)';
        this.collisionColor = '#ccc';
        this.color = this.defaultColor;
        this.isOccupied = false;
    }
    draw() {
        if (context2D) {
            context2D.fillStyle = this.color;
            context2D.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);
        }
    }
    update(mouse) {
        this.draw();
        if (this.hasCollisionWithMouse(mouse) && !this.isOccupied) {
            this.color = this.collisionColor;
        }
        else {
            this.color = this.defaultColor;
        }
    }
    hasCollisionWithMouse(mouse) {
        return (this.position.x <= mouse.x &&
            mouse.x <= this.position.x + TILE_SIZE &&
            this.position.y <= mouse.y &&
            mouse.y <= this.position.y + TILE_SIZE);
    }
}

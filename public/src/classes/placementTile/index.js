import { TILE_SIZE } from '../../constants/index.js';
import context2D from '../../context2D/index.js';
export default class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position;
        this.defaultColor = 'rgba(255,255,255,0.25)';
        this.color = this.defaultColor;
        this.isOccupied = false;
    }
    draw() {
        if (context2D) {
            context2D.fillStyle = this.color;
            context2D.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);
        }
    }
    update(activeDashboardTower) {
        if (activeDashboardTower && !this.isOccupied) {
            this.draw();
            this.color = this.defaultColor;
        }
    }
    hasCollisionWithMouse(dashboardTowerShadow) {
        return (this.position.x <= dashboardTowerShadow.position.x &&
            dashboardTowerShadow.position.x <= this.position.x + TILE_SIZE &&
            this.position.y <= dashboardTowerShadow.position.y &&
            dashboardTowerShadow.position.y <= this.position.y + TILE_SIZE);
    }
}

import { resetCanvas } from './context2D/index.js';
import currentEnemies from './data/enemies.js';
import { createPlacementTiles, createTower, updateEnemy, updatePlacementTile, updateTowers } from './helper/index.js';
const placementTiles = createPlacementTiles();
const towers = [];
let activeTile = null;
const mouse = { x: 0, y: 0 };
function startGame() {
    resetCanvas();
    updateEnemy(currentEnemies);
    updatePlacementTile({ placementTiles, mouse });
    updateTowers({ towers });
    requestAnimationFrame(startGame);
}
startGame();
window.addEventListener('mousemove', (event) => {
    var _a;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    activeTile = (_a = placementTiles.find((tile) => tile.hasCollisionWithMouse(mouse))) !== null && _a !== void 0 ? _a : null;
});
window.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied) {
        activeTile.isOccupied = true;
        towers.push(createTower(activeTile.position));
    }
});

import { createEnemies } from '../helper/index.js';
let currentEnemies = createEnemies({ count: 1, moveSpeed: 3 });
function updateEnemies() {
    if (currentEnemies.length <= 0) {
        currentEnemies = createEnemies({ count: 1, moveSpeed: 3 });
    }
    for (let i = currentEnemies.length - 1; i >= 0; i--) {
        const currentEnemy = currentEnemies[i];
        if (currentEnemy.HP <= 0 || currentEnemy.position.x >= 1280) {
            currentEnemies.splice(i, 1);
        }
        else {
            currentEnemy.update();
        }
    }
}
function getCurrentEnemies() {
    return currentEnemies;
}
export { updateEnemies, getCurrentEnemies };
export default currentEnemies;

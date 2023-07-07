import { createEnemies } from '../helper/index.js';
const currentEnemies = createEnemies({ count: 1 });
function updateEnemies() {
    for (let i = currentEnemies.length - 1; i >= 0; i--) {
        const currentEnemy = currentEnemies[i];
        if (currentEnemy.HP <= 0) {
            currentEnemies.splice(i, 1);
        }
        else {
            currentEnemy.update();
        }
    }
}
export { updateEnemies };
export default currentEnemies;

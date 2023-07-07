import Enemy from '../classes/Enemy.js'
import { createEnemies } from '../helper/index.js'
const currentEnemies: Enemy[] = createEnemies({ count: 1 })
function updateEnemies(): void {
    for (let i = currentEnemies.length - 1; i >= 0; i--) {
        const currentEnemy: Enemy = currentEnemies[i]
        if (currentEnemy.HP <= 0) {
            currentEnemies.splice(i, 1)
        } else {
            currentEnemy.update()
        }
    }
}
export { updateEnemies }
export default currentEnemies

import Enemy from '../classes/Enemy.js'
import { createEnemies } from '../helper/index.js'
const currentEnemies: Enemy[] = createEnemies({ count: 0 })
export default currentEnemies

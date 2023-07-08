import Bear from '../classes/enemies/Bear.js';
import BroodMother from '../classes/enemies/BroodMother.js';
import Dragon from '../classes/enemies/Dragon.js';
import Fox from '../classes/enemies/Fox.js';
import Siren from '../classes/enemies/Siren.js';
// let currentEnemies: Enemy[] = createEnemies({ count: 1, moveSpeed: 6 })
let currentEnemies = [
    new Fox({ position: { x: -10, y: 484 } }),
    new Bear({ position: { x: -200, y: 484 } }),
    new Dragon({ position: { x: -300, y: 484 } }),
    new Siren({ position: { x: -400, y: 484 } }),
    new BroodMother({ position: { x: -500, y: 484 } }),
];
function updateEnemies() {
    if (currentEnemies.length <= 0) {
        currentEnemies = [
            new Fox({ position: { x: -10, y: 484 } }),
            new Bear({ position: { x: -200, y: 484 } }),
            new Dragon({ position: { x: -300, y: 484 } }),
            new Siren({ position: { x: -400, y: 484 } }),
            new BroodMother({ position: { x: -200, y: 484 } }),
        ];
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
export { getCurrentEnemies, updateEnemies };
export default currentEnemies;

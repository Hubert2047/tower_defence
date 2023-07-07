import Enemy from './Enemy.js';
export default class Fox extends Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        super({ position });
    }
}

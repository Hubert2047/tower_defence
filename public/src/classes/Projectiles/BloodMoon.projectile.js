import Projectile from './index.js';
export default class BloodMoonProjectile extends Projectile {
    constructor({ position = { x: 0, y: 0 }, offset = { x: -60, y: 30 }, width = 50, height = 50, frameMaxX = 1, frameMaxY = 1, projectileSources, damage, moveSpeed, enemy, }) {
        super({
            position,
            offset,
            width,
            height,
            projectileSources,
            frameMaxX,
            frameMaxY,
            moveSpeed,
            damage,
            enemy,
        });
    }
}

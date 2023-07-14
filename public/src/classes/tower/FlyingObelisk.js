import { E_angels, E_behaviors, E_tower } from '../../enum/index.js';
import { default as Fire } from '../projectile/Fire.js';
import Tower from './index.js';
class FlyingObelisk extends Tower {
    constructor({ position, offset = { x: 10, y: 50 }, width = 80, height = 160, damage = 1000, attackSpeed = 8, attackRange = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, opacity = 1, }) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_22]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_45]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_67]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_112]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_135]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_157]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_202]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_225]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_247]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_270]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_292]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_315]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_337]: {
                    imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                    maxX: 13,
                    maxY: 1,
                    holdTime: 3,
                },
            },
        };
        super({
            name: 'Flying Obelisk Tower',
            towerType: E_tower.FLYING_OBELISK,
            position,
            offset,
            width,
            height,
            initFrames,
            damage,
            attackSpeed,
            attackRange,
            behaviorKey,
            angelKey,
            opacity,
        });
    }
    createProjectile(targetEnemy) {
        const projectileOptions = {
            position: {
                x: this.position.x - this.width + 1.5 * this.offset.x,
                y: this.position.y - this.height + 1.8 * this.offset.y,
            },
            damage: this.damage,
            enemy: targetEnemy,
            moveSpeed: 5,
            offset: { x: 0, y: 0 },
        };
        return new Fire(projectileOptions);
    }
}
FlyingObelisk.prices = 10;
export default FlyingObelisk;

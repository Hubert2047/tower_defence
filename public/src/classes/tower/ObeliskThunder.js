import Thunder from '../../classes/projectile/Thunder.js';
import { E_angels, E_behaviors, E_tower } from '../../enum/index.js';
import Tower from './index.js';
class ObeliskThunderTower extends Tower {
    constructor({ position, offset = { x: 10, y: 55 }, width = 90, height = 240, damage = 100, attackSpeed = 8, attackRange = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, opacity = 1, }) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_22]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_45]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_67]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_112]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_135]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_157]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_202]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_225]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_247]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_270]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_292]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_315]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
                [E_angels.ANGEL_337]: {
                    imageSourceString: '../../../public/src/assets/images/towers/ObeliskThunder/Obelisk_effects.png',
                    maxX: 14,
                    maxY: 1,
                    holdTime: 3,
                },
            },
        };
        super({
            name: 'Obelisk Thunder Tower',
            towerType: E_tower.OBELISK_THUNDER,
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
        return new Thunder(projectileOptions);
    }
}
ObeliskThunderTower.prices = 20;
export default ObeliskThunderTower;

import ThunderExplosion from '../../classes/explosionProjectile/Thunder.js'
import ExplosionProjectile from '../../classes/explosionProjectile/index.js'
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js'
import { I_explosion, I_projectile } from '../../types/interface.js'
import Projectile from './index.js'

export default class ThunderProjectile extends Projectile {
    name: string
    constructor({
        position,
        enemy,
        offset = { x: 0, y: 0 },
        width = 80,
        height = 130,
        moveSpeed = 4,
        damage = 300,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: I_projectile) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_22]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_45]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_67]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_112]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_135]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_157]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_202]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_225]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_247]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_270]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_292]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_315]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
                [E_angels.ANGEL_337]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/thunder/thunder-2.png',
                    maxX: 3,
                    maxY: 2,
                    holdTime: 4,
                },
            },
        }
        super({
            name: 'Thunder',
            projectileType: E_projectile.THUNDER,
            position,
            initFrames,
            enemy,
            offset,
            width,
            height,
            moveSpeed,
            damage,
            behaviorKey,
            angelKey,
        })
        this.name = 'Thunder'
    }
    public update(): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }

    public get canHitEnemy(): boolean {
        const currentProjectileFrame = this.currentFrame
        if (!currentProjectileFrame) return true
        return (
            this.cropPosition.x === currentProjectileFrame.maxX - 1 &&
            this.cropPosition.y === currentProjectileFrame.maxY - 1
        )
    }
    public createExplosion(): ExplosionProjectile {
        const width = 140
        const height = 140
        let explosionOptions: I_explosion = {
            position: {
                x: this.position.x + this.width / 2 - width / 2,
                y: this.position.y + this.height,
            },
            width,
            height,
            offset: { x: 10, y: -50 },
        }
        return new ThunderExplosion(explosionOptions)
    }
}

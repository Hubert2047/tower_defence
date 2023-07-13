import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { T_tower } from '../../types/index.js'
import Tower from './index.js'
export default class DashboardTower extends Tower {
    public dashboardShadow: DashboardTower | undefined
    constructor({
        name,
        towerType,
        position,
        offset,
        width,
        height,
        initFrames,
        attackSpeed,
        attackRange,
        damage,
        behaviorKey,
        angelKey,
        projectileType,
        isDashboardShadow,
        opacity = 1,
    }: T_tower & { isDashboardShadow?: boolean }) {
        super({
            name,
            towerType,
            position,
            offset,
            width,
            height,
            initFrames,
            attackSpeed,
            attackRange,
            damage,
            behaviorKey,
            angelKey,
            projectileType,
            opacity,
        })
        if (!isDashboardShadow) {
            this.dashboardShadow = this.createDashboardShadow({
                name,
                towerType,
                position,
                initFrames,
            })
        }
    }
    createDashboardShadow({ name, towerType, position, initFrames }: T_tower): DashboardTower {
        const baseTowerProperties = getBaseTowerProperties(towerType)
        const towerOptions: T_tower & { isDashboardShadow: boolean } = {
            name,
            towerType,
            position,
            offset: { x: baseTowerProperties.width - 25, y: 25 },
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            isDashboardShadow: true,
            initFrames,
            opacity: 0.75,
        }
        return new DashboardTower(towerOptions)
    }
}

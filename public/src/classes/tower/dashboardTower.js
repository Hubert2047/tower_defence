import getBaseTowerProperties from '../../data/baseProperties/characters/index.js';
import Tower from './index.js';
export default class DashboardTower extends Tower {
    constructor({ name, type, position, offset, width, height, initFrames, attackSpeed, attackRange, damage, behaviorKey, angelKey, projectileType, isDashboardShadow, opacity = 1, }) {
        super({
            name,
            type,
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
        });
        if (!isDashboardShadow) {
            this.dashboardShadow = this.createDashboardShadow({
                name,
                type,
                position,
                initFrames,
            });
        }
    }
    createDashboardShadow({ name, type, position, initFrames }) {
        const baseTowerProperties = getBaseTowerProperties(type);
        const towerOptions = {
            name,
            type,
            position,
            offset: { x: baseTowerProperties.width - 25, y: 25 },
            width: baseTowerProperties.width,
            height: baseTowerProperties.height,
            isDashboardShadow: true,
            initFrames,
            opacity: 0.75,
        };
        return new DashboardTower(towerOptions);
    }
}

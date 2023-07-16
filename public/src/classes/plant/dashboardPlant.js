import { E_angels, E_behaviors } from 'src/enum/index.js';
import getBasePlantsProperties from '../../data/baseProperties/characters/index.js';
import Plant from './index.js';
export default class DashboardPlant extends Plant {
    constructor({ name, type, position, offset, width, height, initFrames, angelKey = E_angels.ANGEL_0, behaviorKey = E_behaviors.IDLE, isDashboardShadow, opacity = 1, }) {
        super({
            name,
            type,
            position,
            offset,
            width,
            height,
            initFrames,
            behaviorKey,
            angelKey,
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
        const basePlantsProperties = getBasePlantsProperties(type);
        const plantOptions = {
            name,
            type,
            position,
            offset: { x: basePlantsProperties.width - 25, y: 25 },
            width: basePlantsProperties.width,
            height: basePlantsProperties.height,
            isDashboardShadow: true,
            initFrames,
            opacity: 0.75,
        };
        return new DashboardPlant(plantOptions);
    }
    update() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
}

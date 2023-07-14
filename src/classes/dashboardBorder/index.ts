import { E_angels, E_behaviors } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_dashboardBorder, T_frame } from '../../types/index.js'
import Sprite from '../sprite/index.js'

export default class Border extends Sprite {
    name: string
    selectedBorder: Border | undefined
    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        initFrames,
        width = 64,
        height = 64,
        isSelectedBorder,
    }: T_dashboardBorder) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({
            position,
            offset,
            width,
            height,
            frames,
        })
        if (!isSelectedBorder) {
            const selectedBorderOptions: T_dashboardBorder = {
                name: `${name}-selected`,
                position,
                initFrames: {
                    [E_behaviors.IDLE]: {
                        [E_angels.ANGEL_0]: {
                            imageSourceString: '../../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                            maxX: 8,
                            maxY: 8,
                            holdTime: 2,
                        },
                    },
                },
                offset: { x: 50, y: 40 },
                width: 160,
                height: 160,
            }
            this.selectedBorder = this.createSelectedBorder(selectedBorderOptions)
        }
        this.name = name
    }
    public update(): void {
        this.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    }
    private createSelectedBorder(selectedBorderOptions: T_dashboardBorder): Border {
        return new Border({ ...selectedBorderOptions, isSelectedBorder: true })
    }
    public updateSelected(): void {
        if (this.selectedBorder) {
            this.selectedBorder.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        }
    }
}

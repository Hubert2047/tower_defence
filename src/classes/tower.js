import { TILE_SIZE } from '../constants/index.js'
import c from '../context2D.js'
export default class Tower {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 2 * TILE_SIZE
        this.height = TILE_SIZE
    }
    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}

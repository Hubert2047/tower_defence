import { TILE_SIZE } from '../constants/index.js'
import c from '../context2D.js'

export default class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.defaultColor = 'rgba(255,255,255,0.2)'
        this.collisionColor = '#ccc'
        this.color = this.defaultColor
        this.isOccupied = false
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE)
    }
    update(mouse) {
        this.draw()
        if (this.hasCollisionWithMouse(mouse)) {
            this.color = this.collisionColor
        } else {
            this.color = this.defaultColor
        }
    }
    hasCollisionWithMouse(mouse) {
        return (
            this.position.x <= mouse.x &&
            mouse.x <= this.position.x + TILE_SIZE &&
            this.position.y <= mouse.y &&
            mouse.y <= this.position.y + TILE_SIZE
        )
    }
}

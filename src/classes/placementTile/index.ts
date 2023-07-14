import { TILE_SIZE } from '../../constants/index.js'
import context2D from '../../context2D/index.js'
import { T_position } from '../../types/index.js'
import DashboardTower from '../tower/dashboardTower.js'
import Tower from '../tower/index.js'
export default class PlacementTile {
    public position: T_position
    private defaultColor: string
    private color: string
    public isOccupied: boolean
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        this.position = position
        this.defaultColor = 'rgba(255,255,255,0.25)'
        this.color = this.defaultColor
        this.isOccupied = false
    }
    private draw(): void {
        if (context2D) {
            context2D.fillStyle = this.color
            context2D.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE)
        }
    }
    public update(activeDashboardTower: Tower | null): void {
        if (activeDashboardTower && !this.isOccupied) {
            this.draw()
            this.color = this.defaultColor
        }
    }
    public hasCollisionWithMouse(dashboardTowerShadow: DashboardTower): boolean {
        return (
            this.position.x <= dashboardTowerShadow.position.x &&
            dashboardTowerShadow.position.x <= this.position.x + TILE_SIZE &&
            this.position.y <= dashboardTowerShadow.position.y &&
            dashboardTowerShadow.position.y <= this.position.y + TILE_SIZE
        )
    }
}

import c from '../context2D.js'
function getVectorNomalized(startPointLocation, endPointLocation) {
    const v = {
        x: endPointLocation.x - startPointLocation.x,
        y: endPointLocation.y - startPointLocation.y,
    }
    const v_normalized = {
        x: v.x / Math.sqrt(v.x * v.x + v.y * v.y),
        y: v.y / Math.sqrt(v.x * v.x + v.y * v.y),
    }
    return v_normalized
}
function createBackground() {
    const image = new Image()
    image.src = 'src/assets/images/gameMap.png'
    c.drawImage(image, 0, 0)
}
export { createBackground, getVectorNomalized }

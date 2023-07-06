import { createBackground } from './helper/index.js'
const canvas = document.querySelector('canvas')
canvas.width = 1280
canvas.height = 768
const context = canvas.getContext('2d')
context.fillRect(0, 0, canvas.width, canvas.height)

function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    createBackground()
}
export { resetCanvas }
export default context

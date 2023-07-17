const canvas = document.querySelector('canvas');
let context = null;
if (canvas) {
    canvas.width = 1280;
    canvas.height = 768;
    context = canvas.getContext('2d');
    if (context)
        context.fillRect(0, 0, canvas.width, canvas.height);
}
function resetCanvas() {
    if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
export { canvas, resetCanvas };
export default context;

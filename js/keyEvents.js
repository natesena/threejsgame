//taken from stemkoski
var keyboard = [];
function keyDown(event){
	keyboard[event.keyCode] = true;
}
//stemkoski
function keyUp(event){
	keyboard[event.keyCode] = false;
}
//stemkoski
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);



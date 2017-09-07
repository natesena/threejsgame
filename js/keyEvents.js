//taken from saucecode https://github.com/saucecode
//this is the most efficient way to have smooth gameplay
//normal key event listeners require multiple presses to continually register
var keyboard = [];
function keyDown(event){
	keyboard[event.keyCode] = true;
}
//saucecode
function keyUp(event){
	keyboard[event.keyCode] = false;
}
//saucecode
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);



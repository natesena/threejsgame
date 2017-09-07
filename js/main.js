console.log('main.js loaded');
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
   } 
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
game.init();
game.animate();
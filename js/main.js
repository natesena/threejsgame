//----------Initial Variables----------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.FontLoader();
var stats = new Stats();

stats.showPanel(0); //stats panel
document.body.appendChild( stats.dom );

var spawns = [];
var bullets = [];
var strings = [];

var score = 0;

var gameReady = false;


function spawnBox() {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: randomColor(), wireframe: true, transparent: true } ); 
    var cube = new THREE.Mesh( geometry, wireframeMaterial );
    var posArr = ranPos(10, 0, 10);
    cube.position.set(posArr[0],posArr[1],posArr[2]);
    scene.add(cube);
    // setTimeout(function() {
        spawns.push(cube);
    // }, 1000)
}

//object functions



function shoot(){
    var geometry = new THREE.SphereGeometry( .5, 8, 8 );
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ee00, wireframe: true, transparent: true } ); 
    var bullet = new THREE.Mesh( geometry, wireframeMaterial );
    bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
    bullet.velocity = new THREE.Vector3(
        -Math.sin(camera.rotation.y),
        0,//change this to y velocity minus gravity
        -Math.cos(camera.rotation.y)
    );
    bullet.alive = true;
    setTimeout(function(){
        bullet.alive = false;
        scene.remove(bullet);
        bullets.shift();
    }, 1000);
    bullets.push(bullet);
    scene.add(bullet);
}

function updateScore(){
    var scoreEl = document.getElementById('p1-score');
    console.log('update score: '+ score);
    scoreEl.textContent = String(score);
}



//codesauce code
var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff }),
    ),
    light: new THREE.AmbientLight( 0xffffff),
    
};
//end codesauce code



init()
animate();

//----------Initial Variables----------
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.FontLoader();
var stats = new Stats();
var blasterSound = new Howl({
    src:['sounds/laserBlast.wav'],
    autoplay:false,
    volume: 0.03,
    onend:function(){
        console.log('finished sound');
    },
});
var spawns = [];
var bullets = [];
var strings = [];
var score = 0;
var gameReady = false;
var currentPlayer = 0;

stats.showPanel(0); //stats panel
document.body.appendChild( stats.dom );

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


init()
setInterval(countDown, 1000);
switchActivePlayerScore();
animate();

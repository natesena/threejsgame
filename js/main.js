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
    // onend:function(){
    //     console.log('finished sound');
    // },
});
var spawns = [];
var bullets = [];
var strings = [];
var score = 0;
var gameReady = false;
var currentPlayer = 1;
var playing;

stats.showPanel(0); //stats panel
document.body.appendChild( stats.dom );
init();
switchActivePlayerScore();
animate();


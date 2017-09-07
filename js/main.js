//this is where the most important global variables are initialized


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
});
var spawns = [];//how many boxes are in play
var bullets = [];//current bullets in play
var strings = [];//string objects in play
var score = 0;
var gameReady = false;//true if delete has been pressed to start game
var currentPlayer = 1;//1 is the first player, 0 is second player
var playing;//variable to make a setinterval function be globally scoped, but not auto called
var rounds = 0;//used to track if both players have played a round

stats.showPanel(0); //stats panel
document.body.appendChild( stats.dom );
init();
switchActivePlayerScore();//appends icon to current player on scoreboard
animate();


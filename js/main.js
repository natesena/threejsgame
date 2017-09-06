
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

//--------Creating Game Object------------
// game.scenes.scene1 = scene;

// var currentPlayer = game.players.player1;
//---


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
//----
//from mr.doob

//---
function init(){

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //-----------GUI Elements--------------------
    var loader = new THREE.TextureLoader();
    var spriteMap = loader.load( 'img/gun_sight.png' );
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(.1, .1, .1);
    sprite.position.set(0,0,-1);
    camera.add(sprite);
    scene.add( camera );
    //-------------------------------
    
    // ambient light to see floor
    scene.add( new THREE.AmbientLight( 0xffffff) );

    //skybox
    var path = "img/cubemap/";
    var format = '.png';
    var urls = [
            path + 'front' + format, path + 'back' + format,
            path + 'top' + format, path + 'bottom' + format,
            path + 'left' + format, path + 'right' + format
        ];
    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;
    scene.background = reflectionCube;
    
    //floor
    var groundTexture = loader.load( 'img/red_grid.png' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 200, 200 );
    groundTexture.anisotropy = 16;
    var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, map: groundTexture } );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
    mesh.position.y = -1;
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );
    
    spawnBox();
    camera.position.z = 5;
    
    document.body.appendChild( stats.domElement );
}






//object functions
function ranPos(x, y, z){
    var coordinates = [];
    var xPos = Math.random() * x;
    var yPos = Math.random() * y;
    var zPos = Math.random() * z;
    coordinates.push(xPos); coordinates.push(yPos); coordinates.push(zPos);
    return coordinates;
}
function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return 'rgb('+r+','+g+','+b+')';
}


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

function detectCollision(object){
    for(var i = 0; i < spawns.length; i++){
        var distance = object.position.distanceTo(spawns[i].position);
        console.log('distance'+distance);
        if(spawns[i].geometry.boundingSphere && distance < spawns[i].geometry.boundingSphere.radius){
            score+=1;
            updateScore();
            //updateText(String(score)); //if we want the score above in 3d format
            scene.remove(spawns[i]);
            spawns.splice(i,1);
            spawnBox();
            console.log('score: '+score);
        }
    }
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


var animate = function () {

    if( gameReady == false ){
        loadingScreen.scene.add(loadingScreen.box);
        loadingScreen.box.position.z = -5;
		requestAnimationFrame(animate);
		
		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
        
        //

		//
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}
     //next three variables take from stemkoski
    var delta = clock.getDelta(); // seconds.
	var moveDelta = 8*delta; // 200 pixels per second
	var rotateAngle = Math.PI /2 * delta;   // pi/2 radians (90 degrees) per second
    stats.begin(); 
    for(var i = 0; i < spawns.length; i++){
        //spawns[i].rotation.x += 0.1;
        spawns[i].rotation.y += 0.1;
    }
    for(var i = 0; i < bullets.length; i++){
        detectCollision(bullets[i]);
        bullets[i].position.add(bullets[i].velocity);
    }
    stats.end();
    requestAnimationFrame( animate );
    //ifs for keyboard events
    if(keyboard[65]){
        camera.position.x+=Math.sin(camera.rotation.y - Math.PI/2)*moveDelta;
        camera.position.z+=Math.cos(camera.rotation.y - Math.PI/2)*moveDelta;
    }
    if(keyboard[68]){
        camera.position.x+=Math.sin(camera.rotation.y + Math.PI/2)*moveDelta;
        camera.position.z+=Math.cos(camera.rotation.y + Math.PI/2)*moveDelta;
    }
    if(keyboard[83]){
        camera.position.x+=Math.sin(camera.rotation.y)*moveDelta;
        camera.position.z+=Math.cos(camera.rotation.y)*moveDelta;
    }
    if(keyboard[87]){
        // console.log(spawns[0].position);
        camera.position.x-=Math.sin(camera.rotation.y)*moveDelta;
        camera.position.z-=Math.cos(camera.rotation.y)*moveDelta;
    }
    if(keyboard[37]){
        camera.rotation.y += rotateAngle;;
    }
    if(keyboard[39]){
        camera.rotation.y -= rotateAngle;
    }
    if(keyboard[13]){
        // console.log(spawns[0].geometry.boundingSphere.radius);
        shoot();
    }

    renderer.render(scene, camera);
};
init()
animate();

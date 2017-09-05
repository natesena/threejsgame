
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.addEventListener( 'keydown', onKeyDown, false );

var spawns = [];
var bullets = [];

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
scene.add( new THREE.AmbientLight( 0x666666 ) );

//floor
var groundTexture = loader.load( 'img/grasslight-big.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 25, 25 );
groundTexture.anisotropy = 16;
var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );
var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
mesh.position.y = - 5;
mesh.rotation.x = - Math.PI / 2;
scene.add( mesh );


//object functions
function ranPos(x, y, z){
    var coordinates = [];
    var xPos = Math.random() * x;
    var yPos = Math.random() * y;
    var zPos = Math.random() * z;
    console.log('coordinates: '+xPos+' , '+ yPos+ ' , '+zPos);
    coordinates.push(xPos); coordinates.push(yPos); coordinates.push(zPos);
    console.log('coordinates arr: '+coordinates);
    return coordinates;
}
function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    console.log('rgb('+r+','+g+','+b+')');
    return 'rgb('+r+','+g+','+b+')';
}

function spawnBox() {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: randomColor() } );
    var cube = new THREE.Mesh( geometry, material );
    var posArr = ranPos(2, 2, 2);
    spawns.push(cube);
    scene.add( cube );
    cube.position.set(posArr[0],posArr[1],posArr[2])
}
function shoot(){
    var geometry = new THREE.SphereGeometry( .05, 8, 8 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var bullet = new THREE.Mesh( geometry, material );
    bullet.position.set(camera.position.x, camera.position.y, camera.position.z - 1);
    bullets.push(bullet);
    scene.add(bullet);
    console.log(camera.position);
    
}

function onKeyDown(){
    var dampening = .05;
    switch( event.keyCode ) {
        case 65: // a key/left
        // console.log('camera y rotation'+ camera.rotation.y);
        camera.position.x+=Math.sin(camera.rotation.y - Math.PI/2);
        camera.position.z+=Math.cos(camera.rotation.y - Math.PI/2);
        break;
        case 68: // d key/right
        // console.log('camera y rotation'+ camera.rotation.y);
        camera.position.x+=Math.sin(camera.rotation.y + Math.PI/2);
        camera.position.z+=Math.cos(camera.rotation.y + Math.PI/2);
        break;
        case 83: // s key/backward
        camera.position.x+=Math.sin(camera.rotation.y);
        camera.position.z+=Math.cos(camera.rotation.y);
        break;
        case 87: // w key/forwards
        
        // console.log('w move start '+camera.position.x+', '+camera.position.z);
        camera.position.x-=Math.sin(camera.rotation.y);
        camera.position.z-=Math.cos(camera.rotation.y);
        // console.log('w move end '+camera.position.x+', '+camera.position.z);
        break;
        case 37: // left arrow
        console.log('camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.y += Math.PI/90;
        break;
        case 38: // up arrow
        console.log('camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.x += Math.PI/90;
        break;
        case 39: // right arrow
        console.log('camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.y -= Math.PI/90;
        break;
        case 40: // down arrow
        console.log('camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.x -= Math.PI/90;
        break;
        case 13: // down arrow
        shoot();
        break;
    }
}

spawnBox();

camera.position.z = 5;


var animate = function () {
    requestAnimationFrame( animate );
    for(var i = 0; i < spawns.length; i++){
        spawns[i].rotation.x += 0.1;
        spawns[i].rotation.y += 0.1;
    }
    renderer.render(scene, camera);
};

animate();


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.addEventListener( 'keydown', onKeyDown, false );

var spawns = [];
var bullets = [];
var strings = [];

var score = 0;

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

//skybox
// var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
// var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
// var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
// scene.add(skyBox);
// scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

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

var loader = new THREE.FontLoader();

function updateText(string){
    scene.remove(strings[0]);
    strings.shift();
    loader.load( 'fonts/font.json', function ( font ) {
            var textGeo = new THREE.TextGeometry( string, {
                font: font,
                size: .25,
                height: .05,
                curveSegments: 12,
            } );
            var textMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
            textMesh = new THREE.Mesh( textGeo, textMaterial );
            textMesh.position.set(camera.position.x-5*Math.sin(camera.rotation.y), 3, camera.position.z-5*Math.cos(camera.rotation.y));
            textMesh.rotation.set(0, camera.rotation.y, 0);
            scene.add(textMesh);
            strings.push(textMesh);
        } );
        
}

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
    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: randomColor(), wireframe: true, transparent: true } ); 
    var cube = new THREE.Mesh( geometry, wireframeMaterial );
    var posArr = ranPos(1, 1, 1);
    spawns.push(cube);
    scene.add( cube );
    cube.position.set(posArr[0],posArr[1],posArr[2])
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
    console.log(bullets.length);
    
}

// function detectCollision(object){
//     for(var i = 0; i < spawns.length; i++){
//         var distance = ((object.position.x-spawns[i].position.x)^2+(object.position.y-spawns[i].position.y)^2+(object.position.z-spawns[i].position.z)^2)^.5;
//         console.log('xDistance: '+(object.position.x-spawns[i].position.x)^2);
//         console.log('yDistance: '+(object.position.y-spawns[i].position.y)^2);
//         console.log('zDistance: '+(object.position.z-spawns[i].position.z)^2);
//         console.log('distance: '+ distance);
//         if(distance < 1){
//             score++;
//             updateText(String(score)); 
//             console.log('score: '+score);
//         }
//     }
// }

function onKeyDown(){
    var dampening = .05;
    switch( event.keyCode ) {
        case 65: // a key/left
        camera.position.x+=Math.sin(camera.rotation.y - Math.PI/2);
        camera.position.z+=Math.cos(camera.rotation.y - Math.PI/2);
        break;
        case 68: // d key/right
        camera.position.x+=Math.sin(camera.rotation.y + Math.PI/2);
        camera.position.z+=Math.cos(camera.rotation.y + Math.PI/2);
        break;
        case 83: // s key/backward
        camera.position.x+=Math.sin(camera.rotation.y);
        camera.position.z+=Math.cos(camera.rotation.y);
        break;
        case 87: // w key/forwards
        camera.position.x-=Math.sin(camera.rotation.y);
        camera.position.z-=Math.cos(camera.rotation.y);
        break;
        case 37: // left arrow
        camera.rotation.y += Math.PI/180;
        break;
        case 38: // up arrow
        console.log('up camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.x += Math.PI/180;
        break;
        case 39: // right arrow
        console.log('right camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.y -= Math.PI/180;
        break;
        case 40: // down arrow
        console.log('down camera rotation'+ camera.rotation.x+','+camera.rotation.y+','+camera.rotation.z);
        camera.rotation.x -= Math.PI/180;
        break;
        case 13: // enter
        console.log('shoot');
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
    for(var i = 0; i < bullets.length; i++){
        bullets[i].position.add(bullets[i].velocity);
        // detectCollision(bullets[i]);
    }
    renderer.render(scene, camera);
};

animate();

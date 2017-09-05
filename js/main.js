
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.addEventListener( 'keydown', onKeyDown, false );

var spawns = [];

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

function onKeyDown(){
    var dampening = .05;
    switch( event.keyCode ) {
        case 65: // up
        camera.position.x -= dampening;
        break;
        case 68: // up
        camera.position.x += dampening;
        break;
       case 83: // up
       camera.position.z += dampening;
       break;
       case 87: // down
       camera.position.z -= dampening;
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

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
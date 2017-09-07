function shoot(){
    blasterSound.play();
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
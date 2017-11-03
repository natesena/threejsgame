//welcomeAnimate is the welcome screen's animation function
//some codesauce code
var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color: randomColor() }),
    ),
    light: new THREE.AmbientLight( 0xffffff),
    loadStrings: [],
    plane: new THREE.Mesh( new THREE.PlaneGeometry( 38, 20, 32, 20 ), new THREE.MeshBasicMaterial({color: randomColor(), side: THREE.DoubleSide, wireframe: true, transparent: true})),
    plane2: new THREE.Mesh( new THREE.PlaneGeometry( 40, 20, 32, 20 ), new THREE.MeshBasicMaterial({color: randomColor(), side: THREE.DoubleSide, wireframe: true, transparent: true})),
    addText: function (string, fontsize, xpos){
        loader.load( 'fonts/font.json', function ( font ) {
                var textGeo = new THREE.TextGeometry( string, {
                    font: font,
                    size: fontsize,
                    height: .025,
                    curveSegments: 12,
                } );
                var textMaterial = new THREE.MeshBasicMaterial({color: randomColor()});
                textMesh = new THREE.Mesh( textGeo, textMaterial );
                textMesh.position.set(xpos,-loadingScreen.loadStrings.length + 1.5, -5);  
                textMesh.rotation.set(0, camera.rotation.y, 0);
                loadingScreen.loadStrings.push(textMesh);
                loadingScreen.scene.add(textMesh);
                
        })
    }
};
//end codesauce code
var welcomeAnimate = function(){
    if(gameReady){
        animate();
        return;//make sure to use a return or else animate and welcomeAnimate will run simultaneously, killing your computer
    }
    stats.begin();
    stats.end();
    requestAnimationFrame(welcomeAnimate);
    loadingScreen.box.position.x -= 0.05;

    if( loadingScreen.box.position.x < - 4 * Math.PI ){
        loadingScreen.box.position.x = 4 * Math.PI;
    } 
    loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);//make the box move around in a funny way
    loadingScreen.plane.position.z = .2*Math.sin(loadingScreen.box.position.x) - 10;
    loadingScreen.plane2.position.z = .2*Math.sin(loadingScreen.box.position.x + 1) - 11;
    for(var k = 0; k < 4; k++){
        if(loadingScreen.loadStrings[k]){
            loadingScreen.loadStrings[k].position.z = .2*Math.sin(loadingScreen.box.position.x + k) - 5;
            loadingScreen.loadStrings[k].rotation.x = .15*Math.sin(loadingScreen.box.position.x + k);
        }
    }
    loadingScreen.box.position.z += .05*Math.sin(loadingScreen.box.position.x);
    loadingScreen.box.rotation.y +=0.1;
    loadingScreen.box.rotation.x +=0.1;
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    if(keyboard[8]){
        playing = setInterval(countDown, 1000);
        gameReady = true;
    }
        return;
}
    

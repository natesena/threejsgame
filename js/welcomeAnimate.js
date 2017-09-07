//some codesauce code
var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff }),
    ),
    light: new THREE.AmbientLight( 0xffffff),
    loadStrings: [],
    plane: new THREE.Mesh( new THREE.PlaneGeometry( 34, 20, 32 ), new THREE.MeshBasicMaterial({color: randomColor(), side: THREE.DoubleSide})),
    addText: function (string){
        loader.load( 'fonts/font.json', function ( font ) {
                var textGeo = new THREE.TextGeometry( string, {
                    font: font,
                    size: .5,
                    height: .05,
                    curveSegments: 12,
                } );
                var textMaterial = new THREE.MeshBasicMaterial({color: randomColor()});
                textMesh = new THREE.Mesh( textGeo, textMaterial );
                textMesh.position.set(-6,-loadingScreen.loadStrings.length, -5);  
                console.log('text position:'+ textMesh.position.y)
                textMesh.rotation.set(0, camera.rotation.y, 0);
                loadingScreen.loadStrings.push(textMesh);
                loadingScreen.scene.add(textMesh);
                
        })
    }
};
//end codesauce code
var welcomeAnimate = function(){
    // if(rounds%2 == 0){
    //     resetScores();
    // }
    if(gameReady){
        animate();
        return;
    }
    stats.begin();
    stats.end();
    requestAnimationFrame(welcomeAnimate);
    loadingScreen.box.position.x -= 0.05;

    if( loadingScreen.box.position.x < -13 ){
        loadingScreen.box.position.x = 13;
    } 
    loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
    loadingScreen.box.position.z += .1*Math.sin(loadingScreen.box.position.x);
    loadingScreen.box.rotation.y +=0.1;
    loadingScreen.box.rotation.x +=0.1;
    renderer.render(loadingScreen.scene, loadingScreen.camera);
    if(keyboard[8]){
        playing = setInterval(countDown, 1000);
        gameReady = true;
    }
        return;
}
    

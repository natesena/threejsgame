//welcomeAnimate is the welcome screen's animation function
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
                    size: .35,
                    height: .025,
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
    if(gameReady){
        animate();
        return;//make sure to use a return or else animate and welcomeAnimate will run simultaneously, killing your computer
    }
    stats.begin();
    stats.end();
    requestAnimationFrame(welcomeAnimate);
    loadingScreen.box.position.x -= 0.05;

    if( loadingScreen.box.position.x < -13 ){
        loadingScreen.box.position.x = 13;
    } 
    loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);//make the box move around in a funny way
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
    

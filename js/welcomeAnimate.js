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
    addText: function (string){
        loader.load( 'fonts/font.json', function ( font ) {
                var textGeo = new THREE.TextGeometry( string, {
                    font: font,
                    size: .5,
                    height: .1,
                    curveSegments: 12,
                } );
                var textMaterial = new THREE.MeshBasicMaterial({color: randomColor()});
                textMesh = new THREE.Mesh( textGeo, textMaterial );
                textMesh.position.set(-4,-loadingScreen.loadStrings.length, -5);  
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
        return;
    }
    if(keyboard[8]){
        gameReady = true;
        setInterval(countDown, 1000);
    }
        stats.begin();
        stats.end();
        requestAnimationFrame(welcomeAnimate);
        loadingScreen.box.position.x -= 0.05;
        if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
}
    

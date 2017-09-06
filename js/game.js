console.log('game.js loaded');


var game = {
    players: {
        player1: {
            name: 'player1name',
            score: 0,
        },
        player2: {
            name: 'player2name',
            score: 0,
        }
    },
    scenes: {
        scene1: 'scene1name',//changes to default scene upon load
        scene2: 'laodingScreen',
        currentScene: 'scene1',
    },
    camera: 'a camera',
    clock: 'a clock',
    renderer: 'a renderer',
    loader: 'a loader',
    stats: 'a new stat',
    spawns: [],
    bullets: [],
    string: [],
    score: 0,
    time: {
        remaining: 60,
    },
    addText: function (string){
        if(!!strings){//if strings is empty check thisssss
            currentScene.remove(strings[0]);
            strings.shift();
        }
        loader.load( 'fonts/font.json', function ( font ) {
                var textGeo = new THREE.TextGeometry( string, {
                    font: font,
                    size: .25,
                    height: .05,
                    curveSegments: 12,
                } );
                var textMaterial = new THREE.MeshBasicMaterial({color: randomColor()});
                textMesh = new THREE.Mesh( textGeo, textMaterial );
                textMesh.position.set(camera.position.x-5*Math.sin(camera.rotation.y), 3, camera.position.z-5*Math.cos(camera.rotation.y));
                textMesh.rotation.set(0, camera.rotation.y, 0);
                currentScene.add(textMesh);
                strings.push(textMesh);
            });
            
    },
    detectCollision: function(){

    },
    shoot: function(){

    },
    randomColor: function(){

    },
    init: function(){

    },
    updateScore: function (){
        var scoreEl = document.getElementById('p1-score');
        console.log('update score: '+ score);
        scoreEl.textContent = String(score);
    }
}







console.log('game.js loaded');

var game = {
    clock: new THREE.Clock(),
    renderer: new THREE.WebGLRenderer(),
    loader: new THREE.FontLoader(),
    stats: new Stats(),
    
    time: {
        remaining: 60,
    },
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
    screens: {
        view1: {
            scene: new THREE.Scene(),
            camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
            keyboard: [],
            spawns: [],
            bullets: [],
            string: [],
            score: 0,
        },//changes to default scene upon load
        view1: {
            scene: new THREE.Scene(),//should be loading screen
            camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
            keyboard: [],
            spawns: [],
            bullets: [],
            string: [],
            score: 0,
        },
        currentScene: 'scene1',
    },
    spawnBox: function(){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var wireframeMaterial = new THREE.MeshBasicMaterial( { color: this.randomColor(), wireframe: true, transparent: true } ); 
        var cube = new THREE.Mesh( geometry, wireframeMaterial );
        var posArr = ranPos(10, 0, 10);
        cube.position.set(posArr[0],posArr[1],posArr[2]);
        currentScene.add(cube);
        // setTimeout(function() {
        currentScene.spawns.push(cube);
        // }, 1000)
    },
    addText: function (string){
        if(!!currentScene.strings){//if strings is empty check thisssss
            currentScene.remove(strings[0]);
            strings.shift();
        }
        this.loader.load( 'fonts/font.json', function ( font ) {
                var textGeo = new THREE.TextGeometry( string, {
                    font: font,
                    size: .25,
                    height: .05,
                    curveSegments: 12,
                } );
                var textMaterial = new THREE.MeshBasicMaterial({color: this.randomColor()});
                textMesh = new THREE.Mesh( textGeo, textMaterial );
                textMesh.position.set(currentScene.camera.position.x-5*Math.sin(currentScene.camera.rotation.y), 3, currentScene.camera.position.z-5*Math.cos(currentScene.camera.rotation.y));
                textMesh.rotation.set(0, currentScene.camera.rotation.y, 0);
                currentScene.add(textMesh);
                currentScene.strings.push(textMesh);
            });
            
    },
    detectCollision: function(object){
        for(var i = 0; i < spawns.length; i++){
            var distance = object.position.distanceTo(currentScene.spawns[i].position);
            console.log('distance: '+distance);
            if(currentScene.spawns[i].geometry.boundingSphere && distance < currentScene.spawns[i].geometry.boundingSphere.radius){
                currentScene.score+=1;
                updateScore();
                //updateText(String(score)); //if we want the score above in 3d format
                currentScene.remove(currentScene.spawns[i]);
                currentScene.spawns.splice(i,1);
                spawnBox();
                console.log('score: '+currentScene.score);
            }
        }
    },
    shoot: function(){
        var geometry = new THREE.SphereGeometry( .5, 8, 8 );
        var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ee00, wireframe: true, transparent: true } ); 
        var bullet = new THREE.Mesh( geometry, wireframeMaterial );
        bullet.position.set(currentScene.camera.position.x, currentScene.camera.position.y, currentScene.camera.position.z);
        bullet.velocity = new THREE.Vector3(
            -Math.sin(currentScene.camera.rotation.y),
            0,//change this to y velocity minus gravity
            -Math.cos(currentScene.camera.rotation.y)
        );
        bullet.alive = true;
        setTimeout(function(){
            bullet.alive = false;
            currentScene.remove(bullet);
            currentScene.bullets.shift();
        }, 1000);
        currentScene.bullets.push(bullet);
        currentScene.add(bullet);
    },
    randomColor: function(){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        return 'rgb('+r+','+g+','+b+')';
    },
    ranPos: function(){
        var coordinates = [];
        var xPos = Math.random() * x;
        var yPos = Math.random() * y;
        var zPos = Math.random() * z;
        coordinates.push(xPos); coordinates.push(yPos); coordinates.push(zPos);
        return coordinates;
    },
    init: function(){
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    
        //-----------GUI Elements--------------------
        var loader = new THREE.TextureLoader();
        var spriteMap = loader.load( 'img/gun_sight.png' );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(.1, .1, .1);
        sprite.position.set(0,0,-1);
        currentScene.camera.add(sprite);
        currentScene.add( currentScene.camera );
        //-------------------------------
        
        // ambient light to see floor
        currentScene.add( new THREE.AmbientLight( 0xffffff) );
    
        //skybox
        var path = "img/cubemap/";
        var format = '.png';
        var urls = [
                path + 'front' + format, path + 'back' + format,
                path + 'top' + format, path + 'bottom' + format,
                path + 'left' + format, path + 'right' + format
            ];
        var reflectionCube = new THREE.CubeTextureLoader().load( urls );
        reflectionCube.format = THREE.RGBFormat;
        currentScene.background = reflectionCube;
        
        //floor
        var groundTexture = loader.load( 'img/red_grid.png' );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set( 200, 200 );
        groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, map: groundTexture } );
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
        mesh.position.y = -1;
        mesh.rotation.x = - Math.PI / 2;
        currentScene.add( mesh );
        
        spawnBox();
        currentScene.camera.position.z = 5;
        
        document.body.appendChild( stats.domElement );
    },
    updateScore: function (){
        var scoreEl = document.getElementById('p1-score');
        console.log('update score: '+ currentScene.score);
        scoreEl.textContent = String(currentScene.score);
    }
}







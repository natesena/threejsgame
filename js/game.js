console.log('game.js loaded');

var game = {
    clock: new THREE.Clock(),
    renderer: new THREE.WebGLRenderer(),
    loader: new THREE.FontLoader(),
    stats: new Stats(),
    gameReady: false,
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
        view2: {
            scene: new THREE.Scene(),//should be loading screen
            camera: new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ),
            box: new THREE.Mesh(
                new THREE.BoxGeometry(0.5,0.5,0.5),
                new THREE.MeshBasicMaterial({ color:0x4444ff }),
            ),
            light: new THREE.AmbientLight( 0xffffff),
            keyboard: [],
            spawns: [],
            bullets: [],
            string: [],
            score: 0,
        },
    },
    spawnBox: function(){
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var wireframeMaterial = new THREE.MeshBasicMaterial( { color: this.randomColor(), wireframe: true, transparent: true } ); 
        var cube = new THREE.Mesh( geometry, wireframeMaterial );
        var posArr = game.ranPos(10, 0, 10);
        cube.position.set(posArr[0],posArr[1],posArr[2]);
        game.currentView.scene.add(cube);
        // setTimeout(function() {
        game.currentView.spawns.push(cube);
        // }, 1000)
    },
    addText: function (string){
        if(!!game.currentView.strings){//if strings is empty check thisssss
            game.currentView.remove(strings[0]);
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
                textMesh.position.set(game.currentView.camera.position.x-5*Math.sin(currentScene.camera.rotation.y), 3, currentScene.camera.position.z-5*Math.cos(currentScene.camera.rotation.y));
                textMesh.rotation.set(0, game.currentView.camera.rotation.y, 0);
                game.currentView.add(textMesh);
                game.currentView.strings.push(textMesh);
            });
            
    },
    detectCollision: function(object){
        for(var i = 0; i < spawns.length; i++){
            var distance = object.position.distanceTo(game.currentView.spawns[i].position);
            console.log('distance: '+distance);
            if(game.currentView.spawns[i].geometry.boundingSphere && distance < game.currentView.spawns[i].geometry.boundingSphere.radius){
                game.currentView.score+=1;
                updateScore();
                //updateText(String(score)); //if we want the score above in 3d format
                game.currentView.remove(game.currentView.spawns[i]);
                game.currentView.spawns.splice(i,1);
                spawnBox();
                console.log('score: '+game.currentView.score);
            }
        }
    },
    shoot: function(){
        var geometry = new THREE.SphereGeometry( .5, 8, 8 );
        var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ee00, wireframe: true, transparent: true } ); 
        var bullet = new THREE.Mesh( geometry, wireframeMaterial );
        bullet.position.set(game.currentView.camera.position.x, game.currentView.camera.position.y, game.currentView.camera.position.z);
        bullet.velocity = new THREE.Vector3(
            -Math.sin(game.currentView.camera.rotation.y),
            0,//change this to y velocity minus gravity
            -Math.cos(game.currentView.camera.rotation.y)
        );
        bullet.alive = true;
        setTimeout(function(){
            bullet.alive = false;
            game.currentView.remove(bullet);
            game.currentView.bullets.shift();
        }, 1000);
        game.currentView.bullets.push(bullet);
        game.currentView.add(bullet);
    },
    randomColor: function(){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        return 'rgb('+r+','+g+','+b+')';
    },
    ranPos: function(x,y,z){
        var coordinates = [];
        var xPos = Math.random() * x;
        var yPos = Math.random() * y;
        var zPos = Math.random() * z;
        coordinates.push(xPos); coordinates.push(yPos); coordinates.push(zPos);
        return coordinates;
    },
    //game-screens-views(view1,view2)(These are scenes)-scene objects
    init: function(){
        game.currentView = game.screens.view1;
        game.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( game.renderer.domElement );
    
        //-----------GUI Elements--------------------
        var loader = new THREE.TextureLoader();
        var spriteMap = loader.load( 'img/gun_sight.png' );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(.1, .1, .1);
        sprite.position.set(0,0,-1);
        game.currentView.camera.add(sprite);
        game.currentView.scene.add(game.currentView.camera);
        //-------------------------------
        
        // ambient light to see floor
        game.currentView.scene.add( new THREE.AmbientLight( 0xffffff) );
    
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
        game.currentView.scene.background = reflectionCube;
        
        //floor
        var groundTexture = loader.load( 'img/red_grid.png' );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set( 200, 200 );
        groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, map: groundTexture } );
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
        mesh.position.y = -1;
        mesh.rotation.x = - Math.PI / 2;
        game.currentView.scene.add( mesh );
        
        game.spawnBox();
        game.currentView.camera.position.z = 5;
        
        document.body.appendChild( game.stats.domElement );
    },
    updateScore: function (){
        var scoreEl = document.getElementById('p1-score');
        console.log('update score: '+ currentView.score);
        scoreEl.textContent = String.currentView.score;
    },
    animate: function(){
        if( game.gameReady == false ){
            game.currentView = game.screens.view2;
            game.currentView.scene.add(game.currentView.box);
            game.currentView.spawns.push(game.currentView.box);
            game.currentView.spawns[0].position.z = -5;
            requestAnimationFrame(game.animate);
            
            game.currentView.spawns[0].position.x -= 0.05;
            if( game.currentView.spawns[0].position.x < -10 ) game.currentView.spawns[0].position.x = 10;
            game.currentView.spawns[0].position.y = Math.sin(game.currentView.spawns[0].position.x);
            
            //
    
            //
            renderer.render(game.currentView.scene, game.currentView.camera);
            return;
        }
         //next three variables take from stemkoski
        var delta = game.clock.getDelta(); // seconds.
        var moveDelta = 8*delta; // 200 pixels per second
        var rotateAngle = Math.PI /2 * delta;   // pi/2 radians (90 degrees) per second
        game.stats.begin(); 
        for(var i = 0; i < game.currentView.spawns.length; i++){
            //spawns[i].rotation.x += 0.1;
            game.currentView.spawns[i].rotation.y += 0.1;
        }
        for(var i = 0; i < game.currentView.bullets.length; i++){
            detectCollision(game.currentView.bullets[i]);
            game.currentView.bullets[i].position.add(game.currentView.bullets[i].velocity);
        }
        game.stats.end();
        requestAnimationFrame( animate );
        //ifs for keyboard events
        if(keyboard[65]){
            camera.position.x+=Math.sin(camera.rotation.y - Math.PI/2)*moveDelta;
            camera.position.z+=Math.cos(camera.rotation.y - Math.PI/2)*moveDelta;
        }
        if(keyboard[68]){
            camera.position.x+=Math.sin(camera.rotation.y + Math.PI/2)*moveDelta;
            camera.position.z+=Math.cos(camera.rotation.y + Math.PI/2)*moveDelta;
        }
        if(keyboard[83]){
            camera.position.x+=Math.sin(camera.rotation.y)*moveDelta;
            camera.position.z+=Math.cos(camera.rotation.y)*moveDelta;
        }
        if(keyboard[87]){
            // console.log(spawns[0].position);
            camera.position.x-=Math.sin(camera.rotation.y)*moveDelta;
            camera.position.z-=Math.cos(camera.rotation.y)*moveDelta;
        }
        if(keyboard[37]){
            camera.rotation.y += rotateAngle;;
        }
        if(keyboard[39]){
            camera.rotation.y -= rotateAngle;
        }
        if(keyboard[13]){
            // console.log(spawns[0].geometry.boundingSphere.radius);
            shoot();
        }
    
        renderer.render(scene, camera);
    }
}







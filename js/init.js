//init is run first within main.js to initialize both the welcome and playing scenes
function init(){
    
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

    
        //-----------Game Play GUI Elements--------------------
        var loader = new THREE.TextureLoader();
        var spriteMap = loader.load( 'img/gun_sight.png' );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(.1, .1, .1);
        sprite.position.set(0,0,-1);
        camera.add(sprite);
        scene.add( camera );
        //-------------------------------
        
        // ambient light to see floor
        scene.add( new THREE.AmbientLight( 0xffffff) );
    
        //skybox taken from mrdoobs
        var path = "img/cubemap/";
        var format = '.png';
        var urls = [
                path + 'front' + format, path + 'back' + format,
                path + 'top' + format, path + 'bottom' + format,
                path + 'left' + format, path + 'right' + format
            ];
        var reflectionCube = new THREE.CubeTextureLoader().load( urls );
        reflectionCube.format = THREE.RGBFormat;
        scene.background = reflectionCube;
        
        //floor
        var groundTexture = loader.load( 'img/red_grid.png' );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set( 200, 200 );
        groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, map: groundTexture } );
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
        mesh.position.y = -1;
        mesh.rotation.x = - Math.PI / 2;
        scene.add( mesh );
        
        spawnBox();
        camera.position.z = 5;


// welcomeAnimate initialization
        
        loadingScreen.addText('Welcome');
        loadingScreen.addText('to BLASTRON');
        loadingScreen.addText('press delete to play');
        console.log('added text to load screen');
        loadingScreen.scene.add(loadingScreen.box);
        loadingScreen.scene.add(loadingScreen.plane);
        loadingScreen.plane.position.z = -10;
        loadingScreen.box.position.z = -5;

//welcome animate end
        
        document.body.appendChild( stats.domElement );//lets see those FPS!
    }
    
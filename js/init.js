function init(){
    
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

    
        //-----------GUI Elements--------------------
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


//from welcomeAnimate
        
        loadingScreen.addText('Welcome');
        loadingScreen.addText('to SMASHTRON');
        loadingScreen.addText('press delete to play');
        console.log('added text to load screen');
        loadingScreen.scene.add(loadingScreen.box);
        loadingScreen.box.position.z = -5;

//from welcome animate end
        
        document.body.appendChild( stats.domElement );
    }
    
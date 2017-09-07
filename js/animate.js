var animate = function () {
    
        if( gameReady == false ){
            loadingScreen.scene.add(loadingScreen.box);
            loadingScreen.box.position.z = -5;
            requestAnimationFrame(animate);
            
            loadingScreen.box.position.x -= 0.05;
            if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
            loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
            renderer.render(loadingScreen.scene, loadingScreen.camera);
            return;
        }
         //next three variables take from stemkoski
        var delta = clock.getDelta(); // seconds.
        var moveDelta = 8*delta; // 200 pixels per second
        var rotateAngle = Math.PI * delta;   // pi/2 radians (90 degrees) per second
        stats.begin(); 
        for(var i = 0; i < spawns.length; i++){
            //spawns[i].rotation.x += 0.1;
            spawns[i].rotation.y += 0.1;
        }
        for(var i = 0; i < bullets.length; i++){
            detectCollision(bullets[i]);
            bullets[i].position.add(bullets[i].velocity);
        }
        stats.end();
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
    };
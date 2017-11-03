//animate gets run as fast as the computer can go (60fps+)
//each call is a check on the game logic

var animate = function () {
        if(gameReady == false){//if the game or rather player has not hit the delete key to start playing
            score = 0;//current player's score is reset
            welcomeAnimate();//render welcome screen
            return;//return to make sure only one scene is animated at once -- COMPUTER WILL BLOW UP!
        }
        //next three variables take from stemkoski
        var delta = clock.getDelta(); // seconds passed since last animate call.
        var moveDelta = 8*delta; 
        var rotateAngle = Math.PI * delta;   // pi radians (180 degrees) per second
        //end code referenced by stemkoski
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
            shoot();
        }
    
        renderer.render(scene, camera);
    };
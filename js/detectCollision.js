function detectCollision(object){
    for(var i = 0; i < spawns.length; i++){
        var distance = object.position.distanceTo(spawns[i].position);
        //console.log('distance'+distance);
        if(spawns[i].geometry.boundingSphere && distance < spawns[i].geometry.boundingSphere.radius){
            score+=1;
            updateScore();
            //updateText(String(score)); //if we want the score above in 3d format
            scene.remove(spawns[i]);
            spawns.splice(i,1);
            spawnBox();
            // console.log('score: '+score);
        }
    }
}
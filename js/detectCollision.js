//detectCollision gets run every animation frame if there are bullets in play
//it calculates the distance between every box object and bullet. if the distance 
//between the bullet and box is less that the box's collider, then a score is registered
function detectCollision(object){//in this case, the object is each bullet
    for(var i = 0; i < spawns.length; i++){//calculate distance between current bullet and each box on field
        var distance = object.position.distanceTo(spawns[i].position);//distance between bullet and box
        if(spawns[i].geometry.boundingSphere && distance < spawns[i].geometry.boundingSphere.radius){//if a target is hit
            score+=1;
            updateScore();
            scene.remove(spawns[i]);
            spawns.splice(i,1);
            spawnBox();
        }
    }
}
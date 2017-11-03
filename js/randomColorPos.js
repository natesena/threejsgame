//ranPos sets each box object in a random position
//randomColor makes game objects wacky colors
function ranPos(x, y, z){
    var coordinates = [];
    var xPos = Math.random() * x;
    var yPos = Math.random() * y;
    var zPos = Math.random() * z;
    coordinates.push(xPos); coordinates.push(yPos); coordinates.push(zPos);
    return coordinates;
}
function randomColor(){
    var r = 50 + Math.floor(Math.random()*206);
    var g = 50 + Math.floor(Math.random()*206);
    var b = 50 + Math.floor(Math.random()*206);
    return 'rgb('+r+','+g+','+b+')';
}
#Welcome to the BLASTRON Readme!
##play me [here](https://natesena.github.io/threejsgame/) 

###Technologies used
HTML, CSS, Javascript, Three.js, Howler.js

Howler.js is an audio library that gives users greater functionality over audio. in my case, I wanted to make my blaster volume less loud, so I incorporated this library.

Read more on Howler.js [here](https://github.com/goldfire/howler.js#documentation)

Three.js is a cross-browser JavaScript library/API used to create and display animated 3D computer graphics in a web browser. Three.js allows the creation of GPU-accelerated 3D animations using the JavaScript language as part of a website without relying on proprietary browser plugins. This is possible thanks to the advent of WebGL. Three.JS was created by Ricardo Cabello (Mr.Doob).

Read more on Three.js [here](https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene)
###Installation Instructions
Clone it! Clone blastron to a local directory and then run BLASTRON in your browser by running a local webserver.
This can be done by installing [python](https://www.python.org/downloads/), navigating to the project directory, and typing in
`python -m SimpleHTTPServer` in the console.
Then, navigate to the localhost:'port number' that is written in the console.
URL Example: localhost:8000

###Unsolved Problems/Areas of Future Improvement

1. Adding functionality to shoot upwards(will require mastery of moving game object on global axes)
2. More sounds throughout the game
3. more different types of shots
2. Along the same token, making box objects appear in the air
3. Adding gravity to bullets
4. Terrains with a height map
3. Varying types of game objects
4. A model to represent the player
5. Making the reticule a different color
6. Animating the reticule during each shot
7. "Power Ups"
8. Ability to easily turn sound effects on and off
9. Moving game objects around randomly
10. Online multiplayer

###Approach taken
I originally wanted to create a WebVR game with Aframe.IO. I found difficulty accesing game object properties, which made me switch to three.js, where these properties are easily accessed and animated with simple math.

I began with getting the general movement down. One interesting aspect here is that as you move your player(camera), you can quickly lose track of global axes to get the desired behavior. This required some trigonometric math which Saucecode's tutorials lent much help.

From there, bullets were added into the mix. Collision detection was difficult to get right, as it seems timing issues make newly appended box game objects not fully fleshed out before the next animation frame is called, making my desired property to access null. Modifying the function to avoid this error fixed it. To calculate whether the boxes were hit, I checked whether the distance between the each bullet and game object box was less than the bounding sphere's radius for each box game object.

Modularization of code and simpler functions with the right timing to run made the rest relatively easy to work with.



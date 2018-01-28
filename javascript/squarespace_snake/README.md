# Snake!

## How to Run

There are two ways to play Snake!:

1. [Play the game here](https://peterwlee.com/snake/index.html)
2. A pre-built version of the game is located in the `./dist/` directory. Load `./dist/index.html` into a web browser (Chrome is preferred).

## How to Play

1. Arrow keys to move
2. Spacebar to start/restart
3. Eat food
4. Avoid walls and your long, snaky body

## Build Instructions

This project uses webpack to bundle ES6 and Sass CSS modules. Babel is also used to transpile ES6 to ES2015. To build the project run:

1. `$ npm install`
2. `$ npm run build`

## Design Walkthrough & Next Steps

### Design Walkthrough

This project is designed using fairly standard object-oriented principles. Some notable decisions include:

- Rendering is done through the canvas because, generally, it renders much faster than the DOM.
- The main renderable elements in the game (snake-node, walls, food) all inherit from the GameObject class. This GameObject class contains a basic render function which can be overwritten by child classes if more complex rendering is required (multiple paths/shapes, images, ..etc.).
- To keep things small and simple, method privacy is not enforced. Instead, private methods are prefixed with an underscore to denote that they should only be accessed privately.

### Next Steps

- When drawing each frame the canvas is completely cleared and then redrawn. Since most of the actual canvas doesn't change (the walls, for instance, don't move at all), this is pretty inefficient. I would love to optimize the rendering logic by only clearing/rendering what needs to be updated.

- Although not entirely needed, using two-phase collision detection would improve performance substantially if the game had more (much more) collidable objects. Two-phase collision detection can quickly rule out objects that are too far to collide, thus dramatically reducing the number of collision pairs to check against.

# Pan and Zoom

## How to Run

There are two ways to run the demo:

1. [See it here](https://peterwlee.com/pan-and-zoom/index.html)
2. A pre-built version of the demo is located in the `./dist/` directory. Load `./dist/index.html` into a web browser.

## Build Instructions

This project uses Webpack to bundle React components (written in ES6) and Sass CSS modules. Babel is also used to transpile ES6 to ES2015. To build the project run:

1. [Download and install Node.js + npm (if you don't have it already)](https://nodejs.org/en/)
2. `$ npm install`
3. `$ npm run build`

## Design Walkthrough & Next Steps

### Design Walkthrough

Pan and zoom functionality is provided by the PanZoom component. The PanZoom component is comprised of two smaller components: the Pan component and the Zoom component. Both of these components can operate independently. The Zoom component, for example, does not require the Pan component to do its job. However, the components can also be combined to apply both transformations on top of one another.

Panning and zooming are accomplished by applying the `transform` style rule with the appropriate function. Zooming uses the `scale` function, panning uses the `translate` function, and in theory, it should be easy enough to add support for `rotate` and `skew`.

### Next Steps

The PanZoom component uses one high resolution image for everything. In it's initial state, depending on the device resolution, there's no need to load a 2000px x 2000px image. Instead, we should be providing images of appropriate size when user needs it. More specifically, we should load a small preview image on page load, inspect the display resolution, and then lazy load the high resolution version so that way the user doesn't have to wait when they try and zoom in.

And, as previously mentioned, support for `rotate` and `skew` would be an interesting exercise.

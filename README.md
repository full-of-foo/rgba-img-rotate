# RGBA Image Rotate
![CI](https://github.com/full-of-foo/rgba-img-rotate/workflows/CI/badge.svg)

RGBA image rotation for [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) objects. Along with supporting ImageData rotation in browsers, Node environments are supported via the [canvas-node](https://github.com/Automattic/node-canvas) API.

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx), a frictionless CLI for TypeScript package development, which is used to bundle this package with Rollup into UMD, and provides watcher, Jest test utilities and other goodies.

## Installation

This package is not yet released to NPM or elsewhere but can be built locally for development and production in UMD format for use in Node or browser contexts.

First, to bootstrap your local environment, clone this repo and enter it, install the Node version listed in `.nvmrc` with the latest yarn version, then run `yarn` to install all development/build-time packages and build the package:

```
$ git clone git@github.com:full-of-foo/rgba-img-rotate.git
$ cd rgba-img-rotate
$ nvm install
$ brew install yarn # will be different on Linux and Windows
$ yarn
$ yarn build # UMD package for development and production
```

For usage with Node and [canvas-node](https://github.com/Automattic/node-canvas):

```
# Install node-canvas and making available in the console
$ brew install pkg-config cairo pango libpng jpeg giflib librsvg # will be different cavas deps on Linux and Windows
$ npm install -g canvas
$ npm link canvas
$ yarn link # make rgba-img-rotator available
$ node # enter console
> const { ImageData } = require('canvas')
> const { ImageDataRotator } = require('./dist/rotator.umd.development.js')
> const arr = [0,0,0,255,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]
> const rotatedImageData = ImageDataRotator.rotate(new ImageData(new Uint8ClampedArray(arr), 2, 3), 90)
```

For usage in the browser:

```
# refer to the built package by either hosting it yourself or referring to it locally (we refer to it locally here)
$ mkdir -p tmp && echo "<html>                                                                                                                  
  <script src="../dist/rotator.umd.development.js" charset="utf-8"></script>
  <body>
    <h1>Hello</h1>
  </body>
</html>" >> tmp/index.html
$ open tmp/index.html # open browser
# ...in development console / global scope
> const arr = [0,0,0,255,0,0,0,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,]  
> const ImageDataRotator = window.rotator.ImageDataRotator
> ImageDataRotator.rotate(new ImageData(new Uint8ClampedArray(arr), 2, 3), 90)
```

## Local Development

Below is a list of commands you will probably find useful.

### `yarn start`

Runs the project in development/watch mode. The project will be rebuilt upon changes with special logger for your convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

### `yarn build`

Bundles the package to the `dist` folder. The package is optimized and bundled with Rollup into UMD formate exporting a `rotator` package. This can be overridden to bundle other formats such as CommonJS and ES Module.

### `yarn build && yarn test`

Bundles and runs unit, functional and performance tests. Note, the functional tests depend on a target bundled package to test, so that's why we build first!

### `yarn test:watch`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

## Performance tests

Performance tests used the `window.performance` API and so execute in the context of the browser. They are currently ran along with all other tests, currently via `test/perf.test.js`. The outcomes can be observed from the test outputs:

```
...
[0430/121052.125292:INFO:CONSOLE(17)] "rotate [PERF][ImageDataRotator#rotate] 2x3 run-time takes: ~0.01000",
[0430/121052.127670:INFO:CONSOLE(17)] "rotate [PERF][ImageDataRotator#rotate] 4x6 run-time takes: ~0.02000",
[0430/121052.130377:INFO:CONSOLE(17)] "rotate [PERF][ImageDataRotator#rotate] 8x12 run-time takes: ~0.06000",
[0430/121052.139515:INFO:CONSOLE(17)] "rotate [PERF][ImageDataRotator#rotate] 16x24 run-time takes: ~0.22500",
[0430/121052.180138:INFO:CONSOLE(17)] "rotate [PERF][ImageDataRotator#rotate] 64x96 run-time takes: ~1.18000"
...
```

## Roadmap

TODO - checkboxes for what we have and what we dont
TODO - add comments in code
TODO - add references
TODO - add CI badge
TODO - update this read with rest of yarn tasks and so on

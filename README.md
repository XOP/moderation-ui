# Moderation UI

Images moderation interface

## Techs used

- ES6 compiled with [Babel](https://babeljs.io/)
- Fetch API [polyfill](https://github.com/github/fetch)
- [Modernizr](https://modernizr.com/) custom build for detecting touch events support
- [Hammer.js](http://hammerjs.github.io/) for resolving touch gestures events
- Custom [ESLint](http://eslint.org/) [config](https://www.npmjs.com/package/eslint-config-xop)


## Installation

- have [Node](https://nodejs.org/) installed first
- remember to have [Gulp](http://gulpjs.com/) installed globally
- same goes to [Webpack](http://webpack.github.io/)
- you might also need [Browsersync](http://www.browsersync.io/) to be installed globally as well (for development purposes)
- then install all dependencies (from the root folder)

```
npm install
```


## Build

### Production-ready code

```
gulp build --p
```

or

```
npm run build
```

### Development mode

```
gulp
```

### Lint JS

```
npm run lint
```

## [License](LICENSE)

<a href="https://travis-ci.org/Xotic750/v-click-outside-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/v-click-outside-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/v-click-outside-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/v-click-outside-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/v-click-outside-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/v-click-outside-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/v-click-outside-x" title="npm version">
<img src="https://badge.fury.io/js/v-click-outside-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="v-click-outside-x"></a>

# v-click-outside-x

Vue V2 directive to react on `clicks` outside an element.

## Install

```bash
$ npm install --save v-click-outside-x
```

```bash
$ yarn add v-click-outside-x
```

## Use

```js
import Vue from 'vue';
import * as vClickOutside from 'v-click-outside-x';

Vue.use(vClickOutside);
```

```js
<script>
  export default {
    methods: {
      onClickOutside (event) {
        console.log('Clicked outside. Event: ', event)
      }
    }
  };
</script>

<template>
  <div v-click-outside="onClickOutside"></div>
</template>
```

## Directive

```js
import * as vClickOutside from 'v-click-outside-x'

<script>
  export default {
    directives: {
      clickOutside: vClickOutside.directive
    },
    methods: {
      onClickOutside (event) {
        console.log('Clicked outside. Event: ', event)
      }
    }
  };
</script>

<template>
  <div v-click-outside="onClickOutside"></div>
</template>
```

## Event Modifiers

It is not a very common need to call `event.preventDefault()`, `event.stopPropagation()` or
`event.stopImmediatePropagation()` for click outside event handlers.
Care should be taken when using these!

The need for capture though, is reasonably common when you want menus or dropdown to
behave more like their native elements.

```js
<template>
  <!-- the click event´s propagation will be stopped -->
  <div v-click-outside.stop="doThis"></div>

  <!-- the click event´s default will be stopped -->
  <div v-click-outside.prevent="doThat"></div>

  <!-- modifiers can be chained -->
  <div v-click-outside.stop.prevent="doThat"></div>

  <!-- use capture mode when adding the event listener -->
  <div v-click-outside.capture="doThis"></div>
</template>
```

## Pointer Events Examples

By default, if no argument is supplied then `click` will be used. You can specify
the event type being bound by supplying an arguments, i.e. `pointerdown`.

```js
<script>
  export default {
    methods: {
      onClickOutside (event) {
        console.log('Clicked outside. Event: ', event)
      }
    }
  };
</script>

<template>
  <div v-click-outside:pointerdown="onClickOutside"></div>
</template>
```

For support of the [PointerEvent API](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent),
consider loading the [Pointer Events Polyfill](https://www.npmjs.com/package/pepjs).

# Multiple Events Examples

```js
<script>
  export default {
    methods: {
      onClickOutside1 (event) {
        console.log('Clicked outside 1. Event: ', event)
      },
      onClickOutside2 (event) {
        console.log('Clicked outside 2. Event: ', event)
      },
      onClickOutside3 (event) {
        console.log('Clicked outside 3. Event: ', event)
      }
    }
  };
</script>

<template>
  <div
    v-click-outside.capture="onClickOutside1"
    v-click-outside:click="onClickOutside2"
    v-click-outside:pointerdown.capture="onClickOutside3"
  ></div>
</template>
```

## License

[MIT License](https://github.com/ndelvalle/v-click-outside-x/blob/master/LICENSE)

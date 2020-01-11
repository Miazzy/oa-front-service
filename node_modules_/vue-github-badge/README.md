# vue-github-badge

[![NPM version](https://img.shields.io/npm/v/vue-github-badge.svg?style=flat)](https://npmjs.com/package/vue-github-badge) [![NPM downloads](https://img.shields.io/npm/dm/vue-github-badge.svg?style=flat)](https://npmjs.com/package/vue-github-badge) [![Build Status](https://img.shields.io/circleci/project/egoist/vue-github-badge/master.svg?style=flat)](https://circleci.com/gh/egoist/vue-github-badge) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

```bash
yarn add vue-github-badge
```

CDN: https://unpkg.com/vue-github-badge/dist/

## Usage

```vue
<template>
  <github-badge slug="owner/repo" />
</template>

<script>
  import GitHubBadge from 'vue-github-badge'

  export default {
    components: { 
      'github-badge': GitHubBadge
    }
  }
</script>
```

## API

### Props

#### slug

Type: `string`<br>
Required: `true`

GitHub slug (owner/repo)

#### width/height

Type: `number`<br>
Default: `36`

width/height of svg icon

#### fill

Type: `string`<br>
Default: `black`

The `fill` color of svg icon, you can set it to `currentColor` to inherit from parent element.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-github-badge** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vue-github-badge/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)

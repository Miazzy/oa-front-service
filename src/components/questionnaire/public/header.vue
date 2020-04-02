<template>
  <div class="header">
    <router-link to="/qslist" style="">我的问卷</router-link>
    <router-link to="/" style="margin-left:15px;font-size:16px;"
      >返回OA</router-link
    >
  </div>
</template>

<script>
/**
 * A module that define public header component
 * @exports header
 * @author oyh(Reusjs)
 */
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
$orange: #ee7419;

* {
  padding: 0;
  margin: 0;
}
html {
  height: 100%;
  font-size: 62.5%;
}
body {
  height: 100%;
  font-size: 1.4rem;
}
#app {
  height: 100%;
  overflow: auto;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #efefef;
}

.header {
  width: 100%;
  height: 6rem;
  line-height: 6rem;
  background-color: $orange;
  a {
    color: #fff;
    text-decoration: none;
    &:first-child {
      margin-left: 110px;
      font-size: 18px;
      font-weight: 600;
      &:before {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        margin: {
          left: 300px;
        }
        text-align: center;
        line-height: 2.5rem;
        color: $orange;
        border-radius: 1.25rem;
        background-color: #fff;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .header {
    a {
      &:first-child {
        margin-right: 2rem;
      }
    }
  }
}
</style>

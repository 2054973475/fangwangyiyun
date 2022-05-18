<template>
  <div id="app" v-cloak>
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<style lang="less">
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');
#app {
  background-color: rgb(245, 245, 245);
}
body {
  padding: 0;
  margin: 0;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
a{
  text-decoration: none;
  cursor: pointer !important;
}
a:hover{
  text-decoration: underline !important;
}
[v-cloak] {
  display: none !important;
}
</style>

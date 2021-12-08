<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";
@import "../node_modules/simple-line-icons/css/simple-line-icons.css";
@import "../node_modules/ti-icons/css/themify-icons.css";
@import "../node_modules/sweetalert2/dist/sweetalert2.min.css";
@import "../node_modules/vue-snotify/styles/material.css";
@import "../node_modules/codemirror/lib/codemirror.css";
@import "../node_modules/fullcalendar/dist/fullcalendar.css";
@import "../node_modules/c3/c3.min.css";
@import "../node_modules/chartist/dist/chartist.min.css";
@import "./assets/scss/style";
</style>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

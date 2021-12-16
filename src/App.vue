<template>
  <div id="app" class="sidebar-fixed">
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

//滚动条美化
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}

</style>

<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
  background: #d7d7d77d !important;
  /*  background: linear-gradient(to bottom, #135c86, #6a1b74); */
}
#app {
  font-family: "Share Tech Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-row {
  margin-bottom: 30px;
}
.box {
  box-shadow: 1px 1px 5px #7e7881;
  background: linear-gradient(
    to right,
    #2f3c7e 0%,
    #2f3c7e 3%,
    #fbeaeb 3%,
    #fbeaeb 100%
  );
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

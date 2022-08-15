<template>
  <div class="not-found">
    <h2>
      Page not found!
      <router-link :to="{ name: 'UserActions' }">Home Page</router-link>?
    </h2>
  </div>
</template>
<style scoped>
.not-found {
  background: #2f3c7e;
  widows: 100vw;
  height: 100vh;
}
.not-found h2 {
  color: #fff;
  position: relative;
  top: 30%;
}
.not-found a {
  color: #000;
}
</style>

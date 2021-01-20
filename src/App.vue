<template>
  <div id="app">
     <Loader :teste="Loading.val"></Loader>
      <router-view />
  </div>
</template>
<script>

export default {
  inject:['Loading']

};
</script>
<style>
</style>

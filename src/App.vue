<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', 'Roboto', system-ui, -apple-system, sans-serif;
  background: #f7fbff;
  color: #1a3a6e;
  -webkit-font-smoothing: antialiased;
}
</style>

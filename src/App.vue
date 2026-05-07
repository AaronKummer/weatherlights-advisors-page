<template>
  <v-app theme="weatherlight">
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
html { scroll-behavior: smooth; color-scheme: light; }
html, body {
  background: #ffffff !important;
  color: #1a3a6e;
}
body {
  font-family: 'Inter', 'Roboto', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.v-application,
.v-application__wrap,
.v-main {
  background: #ffffff !important;
  color: #1a3a6e !important;
}
@media (prefers-color-scheme: dark) {
  html, body, .v-application, .v-application__wrap { background: #ffffff !important; }
}
</style>

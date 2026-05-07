<template>
  <v-app theme="light">
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
:root { color-scheme: light only; }
html { scroll-behavior: smooth; color-scheme: light; background: #ffffff; }
html, body {
  background: #ffffff !important;
  color: #1a3a6e;
}
body {
  font-family: 'Inter', 'Roboto', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
/* Override Vuetify's theme-driven background at every level */
.v-application,
.v-application > .v-application__wrap,
.v-main,
.v-main__wrap {
  background: #ffffff !important;
  color: #1a3a6e !important;
}
/* Override Vuetify CSS variables directly */
.v-theme--light {
  --v-theme-background: 255, 255, 255 !important;
  --v-theme-surface: 255, 255, 255 !important;
  --v-theme-on-background: 26, 58, 110 !important;
  --v-theme-on-surface: 26, 58, 110 !important;
}
@media (prefers-color-scheme: dark) {
  html, body, .v-application, .v-application > .v-application__wrap, .v-main {
    background: #ffffff !important;
    color: #1a3a6e !important;
  }
}
</style>

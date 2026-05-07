<template>
  <v-app theme="light">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { detectAndApply } from "@/theme";

export default {
  name: 'App',
  mounted() {
    detectAndApply();
  },
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

/* ─────────── Dark Reader / forced-dark fallback theme ───────────
   Activated by adding .dark-fallback to <html> in src/theme.js when
   we detect a dark-mode extension or color-scheme override. Mirrors
   sapphire-nexus-group's dark + teal aesthetic. */
html.dark-fallback,
html.dark-fallback body,
html.dark-fallback .v-application,
html.dark-fallback .v-application > .v-application__wrap,
html.dark-fallback .v-main {
  background: #0a0a0f !important;
  color: #c9d1d9 !important;
}

/* Hide cartoon hero elements that don't fit the dark cyber vibe */
html.dark-fallback .hero-balloons,
html.dark-fallback .cloud { display: none !important; }

/* Hero -> dark gradient with subtle accent radials */
html.dark-fallback .hero {
  background:
    radial-gradient(ellipse at 30% 20%, rgba(0, 212, 170, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(0, 100, 255, 0.06) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0f 0%, #0d1015 100%) !important;
}
html.dark-fallback .hero-wave path { fill: #0a0a0f !important; }

/* Logo: dark-mode SVG colors */
html.dark-fallback .wl-logo path[stroke="#5b9bd5"] { stroke: #00d4aa !important; }
html.dark-fallback .wl-logo polygon { fill: #00d4aa !important; }
html.dark-fallback .wl-logo text tspan[fill="#1a3a6e"] { fill: #ffffff !important; }
html.dark-fallback .wl-logo text tspan[fill="#5b9bd5"] { fill: #00d4aa !important; }
html.dark-fallback .wl-logo text[fill="#6b7c93"] { fill: #8b949e !important; }
html.dark-fallback .wl-logo line { stroke: #00d4aa !important; }

/* Hero text + buttons */
html.dark-fallback .hero-title { color: #ffffff !important; }
html.dark-fallback .hero-sub { color: #8b949e !important; }
html.dark-fallback .btn-primary {
  background: linear-gradient(135deg, #00d4aa 0%, #00a888 100%) !important;
  color: #0a0a0f !important;
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.25) !important;
}
html.dark-fallback .btn-primary:hover {
  box-shadow: 0 12px 40px rgba(0, 212, 170, 0.4) !important;
}
html.dark-fallback .btn-secondary {
  background: transparent !important;
  color: #c9d1d9 !important;
  border-color: #30363d !important;
}
html.dark-fallback .btn-secondary:hover {
  border-color: #00d4aa !important;
  color: #00d4aa !important;
  background: transparent !important;
}

/* Nav */
html.dark-fallback .nav-header { background: transparent !important; border-bottom: 1px solid transparent !important; }
html.dark-fallback .nav-header.scrolled {
  background: rgba(10, 10, 15, 0.95) !important;
  border-bottom-color: rgba(255, 255, 255, 0.05) !important;
}
html.dark-fallback .nav-link { color: #8b949e !important; }
html.dark-fallback .nav-link:hover { color: #ffffff !important; }
html.dark-fallback .nav-link-strong { color: #ffffff !important; }
html.dark-fallback .nav-cta {
  background: rgba(0, 212, 170, 0.1) !important;
  border: 1px solid rgba(0, 212, 170, 0.3) !important;
  color: #00d4aa !important;
}
html.dark-fallback .nav-cta:hover { background: rgba(0, 212, 170, 0.2) !important; color: #00d4aa !important; }
html.dark-fallback .nav-divider { background: rgba(255, 255, 255, 0.08) !important; }
html.dark-fallback .logo-weather { color: #ffffff !important; }
html.dark-fallback .logo-light { color: #00d4aa !important; }
html.dark-fallback .logo-sub { color: #8b949e !important; }

/* User pill */
html.dark-fallback .user-pill { border-color: rgba(255, 255, 255, 0.1) !important; }
html.dark-fallback .user-pill:hover { border-color: rgba(0, 212, 170, 0.4) !important; }
html.dark-fallback .user-avatar { background: linear-gradient(135deg, #00d4aa, #008f76) !important; color: #0a0a0f !important; }
html.dark-fallback .user-handle { color: #c9d1d9 !important; }
html.dark-fallback .user-menu { background: #161b22 !important; border-color: rgba(255, 255, 255, 0.08) !important; }
html.dark-fallback .user-menu-email { color: #8b949e !important; border-bottom-color: rgba(255, 255, 255, 0.06) !important; }
html.dark-fallback .user-menu button { color: #c9d1d9 !important; }
html.dark-fallback .user-menu button:hover { background: rgba(0, 212, 170, 0.1) !important; color: #00d4aa !important; }

/* Sections + tints */
html.dark-fallback .content-section { background: #0a0a0f !important; }
html.dark-fallback .content-section-tint {
  background: linear-gradient(180deg, #0d1015 0%, #0a0a0f 100%) !important;
  border-top-color: rgba(255, 255, 255, 0.05) !important;
  border-bottom-color: rgba(255, 255, 255, 0.05) !important;
}
html.dark-fallback .members-section {
  background: linear-gradient(180deg, #0a0a0f 0%, #0d1015 100%) !important;
  border-bottom-color: rgba(255, 255, 255, 0.05) !important;
}
html.dark-fallback .eyebrow { color: #00d4aa !important; }
html.dark-fallback .section-title { color: #ffffff !important; }
html.dark-fallback .section-lede { color: #8b949e !important; }
html.dark-fallback .about-p { color: #8b949e !important; }

/* Service cards */
html.dark-fallback .service-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
}
html.dark-fallback .service-card:hover { border-color: rgba(0, 212, 170, 0.3) !important; box-shadow: 0 4px 24px rgba(0, 212, 170, 0.08) !important; }
html.dark-fallback .service-card h3 { color: #ffffff !important; }
html.dark-fallback .service-card p { color: #8b949e !important; }
html.dark-fallback .service-icon { color: #00d4aa !important; }

/* Cert tier cards */
html.dark-fallback .cert-tier {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
}
html.dark-fallback .cert-tier-name { color: #00d4aa !important; }
html.dark-fallback .cert-tier li { color: #c9d1d9 !important; border-bottom-color: rgba(255, 255, 255, 0.04) !important; }

/* Member cards */
html.dark-fallback .member-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}
html.dark-fallback .member-card:hover { border-color: rgba(0, 212, 170, 0.4) !important; box-shadow: 0 12px 32px rgba(0, 212, 170, 0.10) !important; }
html.dark-fallback .member-card-tag { color: #00d4aa !important; background: rgba(0, 212, 170, 0.12) !important; }
html.dark-fallback .member-card-title { color: #ffffff !important; }
html.dark-fallback .member-card p { color: #8b949e !important; }
html.dark-fallback .member-card-cta { color: #00d4aa !important; }

/* Footer */
html.dark-fallback .site-footer { background: #0a0a0f !important; border-top-color: rgba(255, 255, 255, 0.05) !important; }
html.dark-fallback .footer-brand { color: #ffffff !important; }
html.dark-fallback .footer-links a { color: #8b949e !important; }
html.dark-fallback .footer-links a:hover { color: #00d4aa !important; }
html.dark-fallback .footer-copy { color: #484f58 !important; }

/* Modal */
html.dark-fallback .modal-card { background: #161b22 !important; border-color: rgba(255, 255, 255, 0.08) !important; }
html.dark-fallback .modal-title { color: #ffffff !important; border-bottom-color: rgba(255, 255, 255, 0.06) !important; }
html.dark-fallback .modal-intro { color: #8b949e !important; }
html.dark-fallback .modal-actions { border-top-color: rgba(255, 255, 255, 0.06) !important; }
html.dark-fallback .btn-send { background: linear-gradient(135deg, #00d4aa, #00a888) !important; color: #0a0a0f !important; }
html.dark-fallback .v-field { background: #0d1117 !important; }
html.dark-fallback .v-field__outline { color: #30363d !important; }
html.dark-fallback .v-label { color: #8b949e !important; }
html.dark-fallback .v-field__input { color: #c9d1d9 !important; }
</style>

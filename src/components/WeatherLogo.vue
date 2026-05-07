<template>
  <svg :viewBox="`0 0 240 ${withText ? 220 : 110}`" xmlns="http://www.w3.org/2000/svg" class="wl-logo" :aria-label="withText ? 'WeatherLight Advisors' : 'WeatherLight'">
    <!-- Soft halo behind the W -->
    <defs>
      <radialGradient id="wl-halo" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
        <stop offset="60%" stop-color="#ffffff" stop-opacity="0.0"/>
      </radialGradient>
    </defs>
    <ellipse cx="120" cy="55" rx="120" ry="60" fill="url(#wl-halo)"/>

    <!-- Arc above the W -->
    <path
      d="M 70 28 A 50 32 0 0 1 170 28"
      stroke="#5b9bd5"
      stroke-width="3.5"
      fill="none"
      stroke-linecap="round"
    />

    <!-- W mark: two thick V's making a W -->
    <g fill="#1a3a6e">
      <polygon points="40,38 72,38 110,98 95,98" />
      <polygon points="80,98 95,98 120,55 110,98" />
      <polygon points="120,55 130,55 145,98 130,98" />
      <polygon points="135,98 150,98 200,38 168,38" />
    </g>

    <!-- Text (only when withText prop is true) -->
    <g v-if="withText" font-family="Inter, system-ui, sans-serif" font-weight="700" text-anchor="middle">
      <text x="120" y="160" font-size="36" letter-spacing="-0.5">
        <tspan fill="#1a3a6e">Weather</tspan><tspan fill="#5b9bd5">Light</tspan>
      </text>
      <line x1="48" y1="185" x2="92" y2="185" stroke="#5b9bd5" stroke-width="1"/>
      <text x="120" y="192" font-size="13" letter-spacing="6" fill="#6b7c93" font-weight="500">ADVISORS</text>
      <line x1="148" y1="185" x2="192" y2="185" stroke="#5b9bd5" stroke-width="1"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: "WeatherLogo",
  props: {
    withText: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.wl-logo { display: block; }
</style>

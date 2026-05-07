import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'weatherlight',
    themes: {
      weatherlight: {
        dark: false,
        colors: {
          primary: '#1a3a6e',
          secondary: '#5b9bd5',
          accent: '#ff9900',
          background: '#f7fbff',
          surface: '#ffffff',
        },
      },
    },
  },
})

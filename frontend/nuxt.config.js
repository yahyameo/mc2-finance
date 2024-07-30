export default {
  // Global page headers
  head: {
    title: 'M2M Finance',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://s3.tradingview.com/tv.js',
        async: true,
        defer: true,
      },
      {
        src: 'https://cdn.transak.com/sdk/1.0.0/transak.min.js',
        defer: true
      },
    ],
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [
    '~/plugins/event-bus.js',
    '~/plugins/axios.js',
    '~/plugins/cookies.js',
    '~/plugins/websocket.js',
    '~/plugins/socket.io.js'
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration
  axios: {
    baseURL: 'http://localhost:5000/api', // Update this with your backend's base URL
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: false,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
        },
      },
    },
  },

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#1976D2',
          accent: '#424242',
          secondary: '#FF8F00',
          info: '#26A69A',
          warning: '#FFC107',
          error: '#DD2C00',
          success: '#00E676',
        },
      },
    },
  },

  // Build Configuration
  build: {},
};

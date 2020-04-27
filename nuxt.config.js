const isDev = process.env.NODE_ENV !== 'production'
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vee-validate'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    withCredentials: true,
    baseURL: 'https://demo.book24.ru/api/v1/',
    // browserBaseURL: isDev && 'http://localhost:3000/proxy/',
    // proxy: isDev,

    headers: {
      common: {
        Authorization: 'Basic ZGVtby5ib29rMjQ6Ym9vazI0',
        'X-TOKEN': '330d207892855dbd5abd5147ea562094'
      }
    }
  },

  // proxy: {
  //   '/proxy/': {
  //     target: 'https://demo.book24.ru/api/v1/',
  //     pathRewrite: { '^/proxy/': '' },
  //     changeOrigin: true,
  //     proxyHeaders: true
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}

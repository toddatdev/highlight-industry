process.env.VUE_APP_STANDALONE_BUNDLE = process.env.STANDALONE_BUNDLE
module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'https://dev.highlightportal.com',
                // target: 'https://highlightportal.com/',
                changeOrigin: true,
                ws: true
            }
            // '/rest': {
            //   target: 'http://localhost:3085',
            //   ws: true,
            //   changeOrigin: true
            // }
        }
    },
    ...(process.env.NODE_ENV === 'production' ? {
        assetsDir: '/static',
        chainWebpack: config => {
            if (config.plugins.has('extract-css')) {
                const extractCSSPlugin = config.plugin('extract-css')
                extractCSSPlugin && extractCSSPlugin.tap(() => [{
                    filename: 'static/css/[name].css',
                    chunkFilename: 'static/css/[name].css'
                }])
            }
        },
        configureWebpack: {
            output: {
                filename: 'static/js/[name].js',
                chunkFilename: 'static/js/[name].js'
            }
        }
    } : {})
}

module.exports = {
    // publicPath: './',
    // configureWebpack: {
    //     externals: {
    //         'vue': 'Vue',
    //         'vue-router': 'VueRouter',
    //         'vuex': 'Vuex',
    //         'axios': 'axios',
    //         'element-ui': 'ELEMENT'
    //     }
    // },
    devServer: {
        proxy: 'http://152.136.19.14:7001',
        // proxy: 'http://192.168.111.88:7001',
        // proxy: 'http://169.254.53.95:7001',
        // proxy: 'http://192.168.3.66:7001',
        open: true,
    }
}
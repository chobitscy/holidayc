const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'element-ui':'ELEMENT',
    'qs.js':'qs',
    'moment':'moment'
};
const cdn = {
    css: [
        'https://unpkg.com/element-ui@2.15.1/lib/theme-chalk/index.css'
    ],
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js',
        'https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.6/qs.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js'
    ]
};
const webpack = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        config.plugin('html').tap(args => {
            args[0].cdn = cdn;
            return args
        });
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
    },

    configureWebpack: () => {
        return {
            resolve:{
                alias:{
                    '@':require('path').resolve(__dirname, './src'),
                    '@i':require('path').resolve(__dirname, './src/assets'),
                }
            },
            externals: externals,
            plugins: [
                //gzip压缩
                new CompressionPlugin({
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), //匹配文件名
                    threshold: 10240, //对超过10k的数据压缩
                    deleteOriginalAssets: false //不删除源文件
                }),
                new webpack.optimize.LimitChunkCountPlugin({
                    maxChunks: 5,
                    minChunkSize: 100
                })
            ],
            performance: {
                hints: false
            },
        };
    },
};
const path = require("path");
const defaultSettings = require("./src/settings.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    productionSourceMap: false,
    configureWebpack: config => {
        config.plugins.push(
            new CompressionWebpackPlugin({
                minRatio: 0.75,
                threshold: 5120,
                deleteOriginalAssets: false,
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp("\\.(" + ["html", "js", "css"].join("|") + ")$")
            })
        );
        config.externals = {
            d3: "d3"
        };
        (config.name = defaultSettings.title),
            (config.resolve = {
                extensions: ["*", ".js", ".vue", ".json"],
                alias: {
                    "@": resolve("src")
                }
            });
    },
    devServer: {
        port: 10086,
        proxy: {
            '/dev-api/aix': { // 配置的变量
                // target: 'http://localhost:8081/aix', // 需要请求的第三方接口
                target: 'http://183.129.217.214:20182/aix', // 需要请求的第三方接口
                changeOrigin: true, // 在本地会创建一个虚拟服务器，然后发送请求，并同时接收请求，这样服务端和服务端进行交互就不会有跨域问题
                pathRewrite: { // 这里重写路径，如果test本身不存在接口路径中，一定要写成空！！！
                    '^/dev-api/aix': '/'
                },
                ws: false
            }
        },
    },
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
};

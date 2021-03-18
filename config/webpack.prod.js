var webpack = require("webpack"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    merge = require("webpack-merge"),
    common = require("./webpack.config"),
    path = require("path"),
    WorkboxPlugin = require('workbox-webpack-plugin');

var specific = {
    mode: "production",

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "../assets"),
                to: path.join(__dirname, "../dist/assets")
            },
            {
                from: path.resolve(__dirname, "./netlify.redirects"),
                to: "_redirects",
                toType: "file"
            }
        ]),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast 
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            exclude: [/_redirects/],
            runtimeCaching: [{
                urlPattern: /^https/,
                handler: "NetworkFirst"
            }]
        })
    ],

    output: {
        publicPath: "/"
    },

    cache: {
        // 1. Set cache type to filesystem
        type: 'filesystem',

        buildDependencies: {
            // 2. Add your config as buildDependency to get cache invalidation on config change
            config: [path.resolve(__dirname, 'config/webpack.config.js'), path.resolve(__dirname, 'config/webpack.dev.js'), path.resolve(__dirname, 'config/webpack.prod.js'), path.resolve(__dirname, 'config/babel-config.js')],

            // 3. If you have other things the build depends on you can add them here
            // Note that webpack, loaders and all modules referenced from your config are automatically added
        },
    },
};

module.exports = merge(common, specific);

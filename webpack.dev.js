const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
require('dotenv').config();
const {BACKEND_PORT = 3000, FRONT_END_PORT = 8080, HOST = 'localhost'} = process.env;
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: FRONT_END_PORT,
        disableHostCheck: true,
        compress: true,
        host: HOST,
        proxy: {
            "/api": `http://${HOST}:${BACKEND_PORT}`
        }
    },
    stats: 'verbose',
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                }
            },
            {
                test: /\.(s?css)/i,
                exclude: /node_modules/,
                use: ["style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            sourceMap: true,
                        },
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            },
            {
                test: /\.link\.css$/i,
                exclude: /node_modules/,
                use: [
                    {loader: 'style-loader', options: {injectType: 'linkTag'}},
                    {loader: 'file-loader'},
                ],
            },
            {
                test: /\.(png|jp?e?g|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],

            }, {
                test: /\.(ttf|woff|woff2)$/i,
                exclude: /node_modules/,
                use: [
                    'file-loader',{
                        loader: 'ttf-loader',
                        options: {
                            name: './src/client/fonts/Roboto/[name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
            inject: true,
            minify: true,
            cache: true,
            title: "Webpack App Dev",
            excludeChunks: ['server']
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            // Do not precache images
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                // Match any request that ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'CacheFirst',

                options: {
                    // Use a custom cache name.
                    cacheName: 'images',

                    // Only cache 10 images.
                    expiration: {
                        maxEntries: 10,
                    },
                },
            }],
        }),
    ]
};

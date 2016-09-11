var packageJSON = require('./package.json');
var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const PATHS = {
    app: path.join(__dirname, './src/index.js'),
    devBuild: __dirname,
    //prodBuild: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'webjars', packageJSON.name, packageJSON.version),
    prodBuild: path.join(__dirname, 'publish'),
};

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.devBuild,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.hbs$/, loader: 'handlebars' },
            { test: /\.css$/,  loader: 'style!css' },
            { test: /\.(png|jpg)$/, loader: 'file?name=images/[name].[hash].[ext]' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[hash].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=images/[name].[hash].[ext]&mimetype=image/svg+xml' },
            {
                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
                loader: "babel-loader",
                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "src"),
                ],
                // Options to configure babel with
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: false,

                    // https://babeljs.io/docs/usage/options/
                    babelrc: false,
                    presets: ['react', 'es2015', 'stage-0',],
                    plugins: [
                        'transform-runtime',
                        [
                            'transform-react-remove-prop-types',
                            'transform-react-constant-elements',
                            'transform-react-inline-elements',
                        ],
                    ],
                },
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: './src/assets/index.html'
        }),
        new webpack.NoErrorsPlugin(),
    ]
};

const dev = {
    devtool: 'eval',
    //devtool: 'inline-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000', // Enables websocket connections (needs url and port)
            'webpack/hot/dev-server', // To perform HMR in the browser
            PATHS.app
        ]
    },
    output: {
        path: PATHS.devBuild,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // To generate hot update chunks
    ],

    devServer: {
        hot: true, // Enable HMR in webpack-dev-server and in libs running in the browser
        contentBase: './',
        historyApiFallback: true,
        host: "10.106.2.59",
        port: 3000,
        proxy: {
            '/manager/*': 'http://10.106.2.59:9880/',
            '/web/api/*': 'http://10.106.2.59:9880/'
        }
    },

    watch: true, // 导致构建卡死在 80% optimize chunk assets
};

const prod = {
    devtool: 'cheap-module-source-map',
    //devtool: 'inline-source-map',
    entry: {
        app: [
            PATHS.app
        ]
    },
    output: {
        path: PATHS.prodBuild,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
    ],
};

var config;

// see: http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
    case 'build':
        console.log("using prod config");
        config = merge(common, prod);
        break;
    case 'start':
        console.log("using dev config");
        config = merge(common, dev);
        break;
    default:
        config = merge(common, {});
        break;
}

module.exports = validate(config);

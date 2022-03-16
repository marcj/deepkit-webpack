const path = require('path');
const typeCompiler = require('@deepkit/type-compiler');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './app.ts',
    module: {
        rules: [
            {
                //necessary to support extension-less imports in libraries
                test: /\.m?js/, resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        //this enables @deepkit/type's type compiler
                        getCustomTransformers: (program, getProgram) => ({
                            before: [typeCompiler.transformer],
                            afterDeclarations: [typeCompiler.declarationTransformer],
                        }),
                        experimentalWatchApi: true
                    }
                },
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    keep_classnames: true, //we like class names intact
                },
            }),
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

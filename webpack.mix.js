const mix = require('laravel-mix');

const webpack = require('webpack');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

// Add shell command plugin configured to create JavaScript language file
mix.webpackConfig({
    plugins: [
        new WebpackShellPluginNext({
            onBuildStart: {
                scripts: ['php artisan translations:js'],
                blocking: true,
                parallel: false,
            },
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
        }),
    ],
});

mix.options({
    processCssUrls: false,
    terser: {
        extractComments: false,
    },
});

// Compile app assets
mix.js('resources/js/app.js', 'public/js')
    .sourceMaps()
    .vue()
    .version();

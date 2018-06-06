const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// https://github.com/zeit/next.js/issues/3159
module.exports = {
  webpack(config, { isServer, dev }) {
    // remove friendlyerrorsplugin
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'FriendlyErrorsWebpackPlugin'
    );

    // add it back in with custom options
    if (dev && !isServer) {
      config.plugins.push(
        new FriendlyErrorsWebpackPlugin({ clearConsole: false })
      );
    }
    return config;
  }
};

const webpack = require("webpack")

module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'APP_URL': JSON.stringify(process.env.APP_URL)
          }
        })
      ]
    }
  }
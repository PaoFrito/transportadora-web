const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    configureWebpack: {
      plugins: [
        new Dotenv()
      ]
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['../transportadora-view/src/styles/*.scss']
    }
  }
})
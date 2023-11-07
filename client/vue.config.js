const { defineConfig } = require('@vue/cli-service')
const { config } = require('dotenv')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../src/infrastructure/web/public',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Tasks";
        return args;
      })
  }
})
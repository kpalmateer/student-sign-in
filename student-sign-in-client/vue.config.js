module.exports = {
  // send requests from Vue app to the express server via proxy
  devServer: {
    proxy: 'http://127.0.0.1:3000'
  }
}
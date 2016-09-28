module.exports = {
    entry: './src/App',
    output: {
      path: __dirname + '/lib',
      filename: 'kumagorithm.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /App.jsx$/, loader: 'expose?kumagorithm'
        },
        {
          test: /(\.js|\.jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        },
      ]
    },
    resolve: {
      extensions: ['','.js', '.jsx']
    }
};

const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            include: path.join(__dirname, '..', 'src'),
            exclude: path.join(__dirname, '..', 'node_modules'),
        }     
      ]
    }
};
const path = require('path');

module.exports = {
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
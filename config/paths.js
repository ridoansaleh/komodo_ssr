const path = require('path');

module.exports = {
    context: path.join(__dirname, '..', 'src'),
    build: path.join(__dirname, '..', 'build'),
    public: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/' : '/'
};

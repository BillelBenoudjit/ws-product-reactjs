const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    API_KEY: process.env.REACT_APP_KEY_API,
    URL_ROOT: process.env.REACT_APP_URL_ROOT
}
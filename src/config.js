const dotenv = require('dotenv');

dotenv.config();

const host = {
  /* apiPort: 'http://localhost:8888/api/curryWurst' */
  apiPort: 'https://currywurst2334.herokuapp.com/api/curryWurst'
};

const docker = {
  apiPort: 'http://localhost:8887/api/curryWurst'
};

const config = process.env.REACT_APP_ENVIRONMENT === 'docker'
  ? docker
  : host;

export default config;
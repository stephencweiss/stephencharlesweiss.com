// Notes on configuring eslint can be found here: https://eslint.org/docs/user-guide/configuring
module.exports = {
  "env": {
    "browser": true,
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 9,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  }
}

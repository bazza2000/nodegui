module.exports = {
  "rules": {
    "extends": "google",
    "arrow-parens": [
      1,
      "as-needed"
    ],
    "camelcase": [1, {"properties": "never"}],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": false,
            "MethodDefinition": false,
            "ClassDeclaration": false,
            "ArrowFunctionExpression": false,
            "FunctionExpression": false
        }
    }],
    "indent": ["error", 2]
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true
  }
};
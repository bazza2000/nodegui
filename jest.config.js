module.exports = {
  "collectCoverage": true,
  "globals":{
    "authnUrl":"",
    "authnPort":""
  },
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mockFile.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "reporters": [
    "default",
    "jest-junit"
  ]
}

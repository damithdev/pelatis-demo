var fs = require('fs-extra');
var jsonConcat = require("json-concat");

var localizationSourceFilesEN = [
    "./localization/general.en.json",
    "./localization/auth.en.json",
    "./localization/components.en.json"
  ];
  
  function mergeAndSaveJsonFiles(src, dest) {
    jsonConcat({
        src: src,
        dest: dest
      },
      function (res) {
        console.log('Localization files successfully merged!');
      }
    );
  }


function setEnvironment(configPath, environment) {
    fs.writeJson(configPath, {
        env: environment
      },
      function (res) {
        console.log('Environment variable set to ' + environment)
      }
    );
  }

  // Set environment variable to "production"
setEnvironment('./src/config/env.json', 'production');

// Merge all localization files into one
mergeAndSaveJsonFiles(localizationSourceFilesEN, "./src/localization/en.json");
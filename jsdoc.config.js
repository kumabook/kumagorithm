module.exports =  {
  "tags": {
    "allowUnknownTags": true
  },
  "source": {
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "destination": "./docs/gen"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    },
    "path": "./node_modules/ink-docstrap/template",
    "theme": "flatly",
    "navType": "vertical",
    "linenums": true,
    "dateFormat": "MMMM Do YYYY, h:mm:ss a"
  }
};

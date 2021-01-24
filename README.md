# webpack-cssmap-plugin
Create map for CSS class names from css-loader.

# The motivation
**css-loader :local** is the amasing tool but it has a problem with classic E2E tests. The traditional way is to build test version of application with readable local class names using **localIdentName**.
The **webpack-cssmap-plugin** allows to create the JSON file with mapping between original and compiled class names.

# The usage

Just replace original **css-loader** with **WebpackCssMapPlugin.CssLoader** in your **webpack-config.js** and add **WebpackCssMapPlugin** plugin.

```javascript
const WebpackCssMapPlugin = require('webpack-cssmap-plugin');

module.exports = {
    //...
    module: {
        rules: [{
            test: /.css$/,
            use: [
                "style-loader",
                loader: WebpackCssMapPlugin.CssLoader,
            ]
        }]
    },
    plugins: [
        //...
        new WebpackCssMapPlugin({
          path: 'css-map.json',
        }),
    ],
}
```

Webpack will create JSON file with format

```json
{
    "path/to/css":{
        "local-class-name":"compiled-class-name"
    }
}

```

This file could be used in your E2E tests code to build selectors

```javascript
this.driver.findElement(
    By.css(`.${cssMap["path/to/css"]["local-class-name"]}`)
)
```
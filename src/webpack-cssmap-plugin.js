const path = require("path");
const { RawSource } = require("webpack-sources");
const store = require("./cssmap-store");

/**
 * Get cssmap from store and write to new asset
 */
class WebpackCssMapPlugin {

    constructor(options) {
        this.options = options || {};
        this.options.path = this.options.path || "css-map.json"
    }

    apply(compiler) {
        compiler.hooks.compilation.tap("WebpackCssMapPlugin", (compilation) => {
            compilation.hooks.additionalAssets.tap("WebpackCssMapPlugin", () => {
                const path = this.options.path;
                if (compilation.assets[path]) {
                    this.errorAlreadyExists(path);
                } else {
                    compilation.assets[path] = this.getCssMapSource(compiler)
                }
            });
        });
    }

    getCssMapSource(compiler) {
        const relativeCSSMap = this.getRelativeCSSMap(store.get(), compiler.context);
        return new RawSource(JSON.stringify(relativeCSSMap));
    }

    getRelativeCSSMap(cssMap, basePath) {
        const res = {};
        for (const absolutePath in cssMap) {
            res[path.relative(basePath, absolutePath)] = cssMap[absolutePath];
        }
        return res;
    }

    errorAlreadyExists(name) {
        throw new Error(`Can not create css map file. Asset [${name}] already exists`);
    }
}

WebpackCssMapPlugin.CssLoader = require.resolve('./loader');

module.exports = WebpackCssMapPlugin;
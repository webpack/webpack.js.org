# Quick Start

Webpack works by actually running your code, starting through files called [entry points][1]. As the tool runs, it resolves everything you require, define, or import. It then enters those required files and continues to dive deeper and deeper into the application until there’s nothing left to resolve. Webpack takes everything it’s found and outputs various bundles and files depending on how you’ve [configured][2] it. Throughout this process, it gets to know the inner workings of the application and it’s structure. Using the stats feature and [Analyze][3] tool, you can use this knowledge to optimize your application and reduce bundle size.

Below are a few examples of how modules, anything from HTML, CSS and JavaScript to images or fonts, can be retrieved and processed through Webpack. Feel free to jump straight into the documentation or see the guides section for more detailed examples and tutorials.

    // Modules can be retrieved via CommonJS
    var commonjs = require("./commonjs");

    // ... or through AMD
    define(["amd-module", "../file"], function(module, file) {
        // ...
    });

    // Loaders can process different types of files
    // Use them by prefixing the filepath in a ‘require’
    var cup = require("coffee!./cup.coffee");
    var data = require("json!./data.json");

    // ... or setting them up in the config for various extensions
    //  which simplifies your require call
    require("./cup.coffee");

    // A clever parser extracts information and concludes
    //  that everything in "./templates", matching /\.jade$/,
    //  should be included in the bundle, so it can be require`d,
    //  at runtime
    function loadTemplate(name) {
        return require("./templates/" + name + ".jade");
    }

    // Lazy loading is possible using the bundle-loader
    function loadTemplateAsync(name, callback) {
        require(["bundle?lazy!./templates/" + name + ".jade"], function(templateBundle) {
            templateBundle(callback);
        });
    }

[1]: http://webpack.github.io/reference/entry-points
[2]: http://webpack.github.io/reference/configuration
[3]: http://webpack.github.io/analyze
[4]: http://webpack.github.io/reference
[5]: http://webpack.github.io/guides

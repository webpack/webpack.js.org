<code>

    import {init, append} from './view.js';

    init('output');
    var textDivs = ['npm install babel-loader babel-core babel-preset-es2015 --save-dev',
                'Add modules array to webpack.',
                'Each loader must have an include regex. Put node_modules in exclude regex.',
                'Babel will transpile all the files in the include folder to es5',
                'Babels preset for es2015 has all the transpiling required for es2015 features only']

    textDivs.forEach(textNode => {
        append(textNode);
    })


</code>
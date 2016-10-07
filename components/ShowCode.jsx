import React, {Component} from 'react';
import Snippet from './Snippet.jsx';

export default class ShowCode extends Component {
    constructor(){
        super();
        this.options = [{
            id: 1,
            text: 'Simple',
            mainjs:"import knocker from './knock-knock.js';\n\nlet html = ['<div>' + knocker.knock() + '</div>',\n\t\t'<div>whos there?</div>',\n\t\t'<div>' + knocker.whosthere() + '</div>',\n\t\t'<div> webpack who? </div>',\n\t\t'<div>' + knocker.webpackwho() + '</div>'];\n\ndocument.getElementById('knock').innerHTML = html.join('');",
            secondaryjs:{
                name:'knock-knock.js',
                template: "const knocker = {\n\tknock: function() { return 'Knock Knock'; },\n\twhosthere: function() { return 'webpack'; },\n\twebpackwho: function() { return 'Dayum!' }\n}\n\nexport default knocker"
            },
            webpackjs: {
                template: "module.exports = function () { \n\t return {\n\t\tentry: './main.js',\n\t\toutput: {\n\t\t\tpath: './dist',\n\t\t\tfilename: 'bundle.js'\n\t\t}\n\t}\n}"
            },
            iframe:'<iframe width="100%" height="300" src="//jsfiddle.net/d3gv23fg/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
        },{
            id:2,
            text: 'With babel-loader',
            mainjs:"import view from './view.js';\n\nvar html = ['<div>npm install babel-loader babel-core babel-preset-es2015 --save-dev</div>',\n\t\t'<div>Add modules array to webpack.</div>',\n\t\t'<div>Each loader must have an include regex. Put node_modules in exclude regex.</div>',\n\t\t'<div>Babel will transpile all the files in the include folder to es5</div>',\n\t\t'<div>Babels preset for es2015 has all the transpiling required for es2015 features only</div>']\n\nview.render('output', html);",
            secondaryjs:{
                name:'view.js',
                template: "const render = (elementId, html) => {\n\tgetElement(elementId).innerHTML = html.join('');\n}\n\nconst getElement = elementId => document.getElementById(elementId);\n\nexport default {render};"
            },
            webpackjs: {
                template: "module.exports = function () { \n\t return {\n\t\tentry: './main.js',\n\t\toutput: {\n\t\t\tpath: './dist',\n\t\t\tfilename: 'bundle.js'\n\t\t},\n\t\tmodule: {\n\t\t\tloaders: [{\n\t\t\t\ttest: /\.js$/,\n\t\t\t\texclude: /node_modules/,\n\t\t\t\tloader: 'babel-loader',\n\t\t\t\tquery: {\n\t\t\t\t\tpresets: ['es2015']\n\t\t\t\t}\n\t\t\t}]\n\t\t}\n\t}\n}"
            },
            iframe: '<iframe width="100%" height="300" src="//jsfiddle.net/agr3c7ct/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
        }, {
            id:3,
            text: 'With css-loader',
            mainjs:"require('./styles.css')\n\nvar html = ['<div>npm install css-loader style-loader --save-dev</div>',\n\t\t'<div class=\"red-bk\">I can add classes now</div>']\n\ndocument.getElementById('output').innerHTML = html.join('');",
            secondaryjs:{
                name: "styles.css",
                template: ".red-bk {\n\tbackground-color: red;\n}"
            },
            webpackjs: {
                template: "module.exports = function () { \n\t return {\n\t\tentry: './main.js',\n\t\toutput: {\n\t\t\tpath: './dist',\n\t\t\tfilename: 'bundle.js'\n\t\t},\n\t\tmodule: {\n\t\t\tloaders: [{\n\t\t\t\ttest: /\.css$/,\n\t\t\t\texclude: /node_modules/,\n\t\t\t\tloader: 'style-loader!css-loader'\n\t\t\t}]\n\t\t}\n\t}\n}"
            },
            iframe: '<iframe width="100%" height="300" src="//jsfiddle.net/6dmohyoy/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
        }, {
            id:4,
            text: 'With source-maps'
        }];
        this.state = {
            selectedExample: 1
        };
        this.updateSelectedExample = this.updateSelectedExample.bind(this);
    }
    updateSelectedExample(event) {
        this.setState({
            selectedExample:event.target.value
        });
    } 
    render(){
        const showCodeStyle = {
            padding: '0 5%'
        };
        const rowStyle = {
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        };
        let columnBasic = {
            display: 'inline-block',
            verticalAlign: 'top',
            width: '100%'
        };
        const colleft = Object.assign({}, columnBasic, {
            width: '55%'
        });
        const colright = Object.assign({}, columnBasic, {
            width: '40%',
            marginLeft:'5%'
        });
        const secondaryJs = this.options[this.state.selectedExample - 1]['secondaryjs'];
        const webpackjs = this.options[this.state.selectedExample - 1]['webpackjs'];
        return <div style={showCodeStyle}>
            <select value={this.state.selectedExample} onChange={this.updateSelectedExample}>
                <option disabled key={0}>Select an example...</option>
                {this.options.map(option => <option value={option.id} key={option.id}>{option.text}</option>)}
            </select>
            <div style={rowStyle}>
                <div style={colleft}>
                    <Snippet mode='javascript'
                            name='main.js (entry module)'
                            code={this.options[this.state.selectedExample - 1]['mainjs']}/>
                    <Snippet mode='javascript'
                            name={secondaryJs.name}
                            code={secondaryJs.template}/>
                </div>
                <div style={colright}>
                    <Snippet mode='javascript'
                        name='webpack.config.js'
                        code={webpackjs.template}/>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.options[this.state.selectedExample - 1]['iframe'] }} >
            </div>
        </div>;
    }
}


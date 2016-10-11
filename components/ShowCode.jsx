import React, {Component} from 'react';
import Snippet from './Snippet.jsx';
import simpleTemplates from '../snippets/simple';
import withBabelTemplates from '../snippets/with-babel';
import withCssTemplates from '../snippets/with-css';

console.log(simpleTemplates);
export default class ShowCode extends Component {
    constructor(){
        super();
        this.options = [{
            id: 1,
            templates: simpleTemplates,
            text: 'Simple',
            leftJs: [{
                type:'javascript',
                name: 'mainjs',
                text: 'main.js'
            },{
                type:'javascript',
                name: 'knockknockjs',
                text: 'knock-knock.js'
            }],
            iframe:'<iframe width="100%" height="300" src="//jsfiddle.net/d3gv23fg/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
        },{
            id:2,
            templates: withBabelTemplates,
            text: 'With babel-loader',
            leftJs: [{
                type: 'javascript',
                name: 'mainjs',
                text: 'main.js'
            }, {
                type: 'javascript',
                name: 'viewjs',
                text: 'view.js'
            }],
            iframe: '<iframe width="100%" height="300" src="//jsfiddle.net/agr3c7ct/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
        }, {
            id:3,
            templates: withCssTemplates,
            text: 'With css-loader',
            leftJs: [{
                type: 'javascript',
                name: 'mainjs',
                text: 'main.js'
            }, {
                type: 'css',
                name: 'stylescss',
                text: 'styles.css'
            }],
            iframe: '<iframe width="100%" height="300" src="//jsfiddle.net/6dmohyoy/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>'
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
        const selectedObj = this.options[this.state.selectedExample - 1];
        const exampleName = selectedObj['name'];
        const leftJs = selectedObj['leftJs'];
        // const webpackjs = SnippetTemplate[exampleName].filter(obj => obj['webpack.config.js']);
        return <div style={showCodeStyle}>
            <select value={this.state.selectedExample} onChange={this.updateSelectedExample}>
                <option disabled key={0}>Select an example...</option>
                {this.options.map(option => <option value={option.id} key={option.id}>{option.text}</option>)}
            </select>
            <div style={rowStyle}>
                <div style={colleft}>
                    {leftJs.map((template, index) => <Snippet key={index} mode={template.type} name={template.text} code={selectedObj.templates[template.name]}/>)}
                </div>
                <div style={colright}>
                    <Snippet mode='javascript'
                        name='webpack.config.js'
                        code={selectedObj.templates['webpackconfigjs']}/>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.options[this.state.selectedExample - 1]['iframe'] }} >
            </div>
        </div>;
    }
}


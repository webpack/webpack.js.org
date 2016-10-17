<code>

    import knocker from './knock-knock.js';
    let knock = document.getElementById('knock');
    const divList = [knocker.knock(), 'whos there', knocker.whosthere(), 
                        'webpack who?', knocker.webpackwho()];
    divList.forEach(function(divContent){
        var divFrag = document.createElement('div');
        divFrag.textContent = divContent;
        knock.appendChild(divFrag);
    })

</code>
<code>

    require('./styles.css')

    let output = document.getElementById('output');
    const divList = ['npm install css-loader style-loader --save-dev', 'I can add classes now'];
    divList.forEach(function(div){
        var divFrag = document.createElement('div');
        divFrag.textContent = div;
        divFrag.className = 'red-bk';
        output.appendChild(divFrag);
    })

</code>
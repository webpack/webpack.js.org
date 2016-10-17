<code>

    let elem = null;
    const init = elementId => {
        elem = document.getElementById(elementId);
    }
    const append = text => {
        var divElem = document.createElement('div');
        divElem.textContent = text;
        elem.appendChild(divElem);
    }
    export {append, init};

</code>
import React from 'react';

const imageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH6SURBVGhD7dg/KIRxHMfxQwZK/mRRLEKyGGySUgxSlFISg6wmKwalxGQQ2ZRBKAYGpchmMxuEgYVBUfLf+3vnp6fzex7Pee75p9+nXnXPc7+7ez539z3PI2ES4xTjI0C78CX/rshlcsu/dMEUcRNTJMOYIm5jimQYU8RtTJEMk7UihajWaIS8wJVlnx9GIK9zYNlnVYUc2Ebe8U28QJ4oym4xDG1WIIvucRZhF3j/0owfucMbKpJb0c4k5E2fTW6lRe6QMnHIAOR4F5NbaYlqkUrkp25+J1ZF8rADOa5r1EMlVkVaIMekWA86VkVq8QpVZBwqsZuRQRxiHvKHWiWWw66LKRK1eCoiP4dNAaqBXTwVUafxQXE6jc9KkUfs++gEgRSJwoWVKSKxK1KHdg/aUASVUIqU4Amy34tVqIRSJBcL0A2tW3vohornInLp+JC6qU2UZmQItkVOIXdOQPdd7oGuSAN0652UwS6qyDF0j+3EEWTNGH6kH/KpyAIn1iKleIZunZMt2EUV+c05ZEa1acUSNjS2IU+QPiNz0K13Yp2J9KgiclWoe+w6puD0qTomSjPiKXZF5ASvz4NelEMllCIyI9bL0b9ag0ooReR/sNPQfZfdkhIdUAntq5XtmCJuo4rcQDe02TKDQIoExbciBVgO0ChMYppE4hPrPjmzY7UEnQAAAABJRU5ErkJggg==';

export default function Print (props) {
    const { url } = props;
    return (
      <a href={_printPageUrlFromUrl(url)}
        rel="nofollow"
        alt="Print"
        title="Print"
        target="_blank">
        <img src={imageString} />
      </a>
    );
}

function _printPageUrlFromUrl(urlRaw) {
    // for now support both trailing slash and without it
    // when https://github.com/webpack/webpack.js.org/pull/3064 is merged, this is simplified.
    let url = urlRaw[urlRaw.length-1] === '/' ? urlRaw.substring(0, urlRaw.length-1) : urlRaw;
    let urlSplit = url.split('/');
    return (urlSplit.length > 2) ? `/${url.split('/')[1]}/printable/` : `${url}/printable/`;
  }
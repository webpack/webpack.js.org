// https://sidecar.gitter.im/
import React from 'react';

export default React.createClass({
  displayName: 'Gitter',
  render() {
    const room = this.props.room;
    const title = this.props.title || 'Open chat';

    return (
      <div>
        <div className="gitter-open-chat-button">{title}</div>
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `
            ((window.gitter = {}).chat = {}).options = {
              showChatByDefault: false,
              activationElement: '.gitter-open-chat-button',
              room: '${room}'
            };
          `}} />
        <script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script>
      </div>
    );
  }
});

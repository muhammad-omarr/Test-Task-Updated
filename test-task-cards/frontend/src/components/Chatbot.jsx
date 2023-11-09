import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "1262a70f-ba58-4820-bb1c-6bd752fcd8db",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "1262a70f-ba58-4820-bb1c-6bd752fcd8db",
        botName: "Card AI",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;

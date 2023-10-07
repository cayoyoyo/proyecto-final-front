import React, { useEffect, useState } from 'react';

import Talk from 'talkjs';

const Chat = () => {
  const [talkLoaded, setTalkLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const loadTalkJS = async () => {
      await Talk.ready;
      setTalkLoaded(true);
    };

    loadTalkJS();
  }, []);

  useEffect(() => {
    if (talkLoaded) {
      // Crear el usuario actual (currentUser) y otro usuario (otherUser)
      const currentUserData = {
        id: '6509efe8978a79c2c2cb00da', // ID de usuario desde tu base de datos
        name: 'Carloss', // Nombre del usuario
        email: 'carlossss@gmail.com', // Correo electrónico del usuario
      };

      const otherUserData = {
        id: '650c849977c90d18a56e0ffc', // ID de otro usuario desde tu base de datos
        name: 'Joao Carlos', // Nombre del otro usuario
        email: 'joao@gmail.com', // Correo electrónico del otro usuario
      };

      setCurrentUser(new Talk.User(currentUserData));
      setOtherUser(new Talk.User(otherUserData));
    }
  }, [talkLoaded]);

  useEffect(() => {
    if (currentUser && otherUser) {
      // Crear una sesión y configurar usuarios
      const session = new Talk.Session({
        appId: process.env.REACT_APP_TALKJS_APP_ID, // Utiliza la clave de API desde tu archivo .env
        me: currentUser,
      });

      // Crear una conversación entre currentUser y otherUser
      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      // Crear un chatbox y montarlo en el elemento con el ID "talkjs-container"
      const chatbox = session.createChatbox(conversation);
      chatbox.mount(document.getElementById('talkjs-container'));
    }
  }, [currentUser, otherUser]);

  return (
    <div>
      <h1>Chat</h1>
      <div id="talkjs-container" style={{ height: '500px' }}></div>
    </div>
  );
};

export default Chat;



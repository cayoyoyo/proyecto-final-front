

import React, { useEffect, useRef, useState, useContext } from 'react';
import Talk from 'talkjs';
import { AuthContext } from '../../context/auth.context';

function ChatWithTalkJS(props) {
  const chatboxEl = useRef();
  const { user, isLoggedIn } = useContext(AuthContext);
  const user2 = props.vendedor;

  const [talkLoaded, markTalkLoaded] = useState(false);



  useEffect(() => {
    // Wait for TalkJS to load
    Talk.ready.then(() => markTalkLoaded(true));



    if (talkLoaded && isLoggedIn) {
      const currentUser = new Talk.User({
        id: user._id,
        name: user.name,
        email: user.email,
        photoUrl: 'https://i.pinimg.com/736x/cb/4f/8a/cb4f8ad34336c38b30e64190a77ba720.jpg',
        welcomeMessage: 'Hello!',
        role: 'seller',
      });

      const otherUser = new Talk.User({
        id: user2._id,
        name: user2.name,
        email: user2.email,
        photoUrl: 'https://img.freepik.com/fotos-premium/unleashing-the-digital-battlefield-immersive-esports-logo-backgrounds_983420-24425.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais',
        welcomeMessage: 'Hello!',
        role: 'buyer',
      });

      // Create or get a TalkJS conversation
      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const session = new Talk.Session({
        appId: 'tfLfNCYY',
        me: currentUser,
      });
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (
    <>
      <div className='chatBox23'>
        <div className="divChat" ref={chatboxEl} />
      </div>
    </>
  );
}

export default ChatWithTalkJS;

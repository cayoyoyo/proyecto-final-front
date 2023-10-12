// import Talk from "talkjs";
// import { useEffect, useState, useRef, useContext } from "react";
// import { AuthContext } from "../../context/auth.context";
// import axios from "axios";

// function MyChatComponent(props) {
//   const chatboxEl = useRef();
//   const { user, isLoggedIn } = useContext(AuthContext);

//   const user2 = props.vendedor;

//   // wait for TalkJS to load
//   const [talkLoaded, markTalkLoaded] = useState(false);

//   useEffect(() => {
//     Talk.ready.then(() => markTalkLoaded(true));

//     if (talkLoaded && isLoggedIn) {
//       const currentUser = new Talk.User({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         photoUrl: "henry.jpeg",
//         welcomeMessage: "Hello!",
//         role: "default",
//       });

//       const otherUser = new Talk.User({
//         id: user2._id,
//         name: user2.name,
//         email: user2.email,
//         photoUrl: "jessica.jpeg",
//         welcomeMessage: "Hello!",
//         role: "default",
//       });

//       const session = new Talk.Session({
//         appId: "tfLfNCYY",
//         me: currentUser,
//       });

//       const conversationId = Talk.oneOnOneId(currentUser, otherUser);
//       const conversation = session.getOrCreateConversation(conversationId);
//       conversation.setParticipant(currentUser);
//       conversation.setParticipant(otherUser);

//       const chatbox = session.createChatbox();
//       chatbox.select(conversation);
//       chatbox.mount(chatboxEl.current);

//       return () => session.destroy();
//     }
//   }, [talkLoaded]);

//   return <div className="divChat" ref={chatboxEl} />;
// }

// export default MyChatComponent;

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
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'seller',
      });

      const otherUser = new Talk.User({
        id: user2._id,
        name: user2.name,
        email: user2.email,
        photoUrl: 'jessica.jpeg',
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
    <div className="divChat" ref={chatboxEl} />
  );
}

export default ChatWithTalkJS;

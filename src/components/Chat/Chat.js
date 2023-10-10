import Talk from "talkjs";
import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

function MyChatComponent(props) {
  const chatboxEl = useRef();
  const { user, isLoggedIn } = useContext(AuthContext);

  const user2 = props.vendedor;

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => {
      setTalkLoaded(true);
    });

    if (talkLoaded && user) {
      const currentUser = new Talk.User({
        id: user._id, // Reemplaza esto con el campo correcto que contiene el ID del usuario en tu objeto 'user'
        name: user.name, // Reemplaza esto con el campo correcto que contiene el nombre del usuario en tu objeto 'user'
        email: user.email, // Reemplaza esto con el campo correcto que contiene el correo electrónico del usuario en tu objeto 'user'
        photoUrl: user.avatar, // Reemplaza esto con el campo correcto que contiene la URL de la foto del usuario en tu objeto 'user'
        welcomeMessage: 'Hello!',
        role: "default"
      });

      const session = new Talk.Session({
        appId: process.env.REACT_APP_TALKJS_APP_ID, // Reemplaza 'YOUR_APP_ID' con la variable de entorno correcta que contiene tu ID de la aplicación Talk.js
        me: currentUser
      });

      const chatbox = session.createChatbox();
      chatbox.mount(chatboxDiv.current);

      return () => session.destroy();
    }
  }, [talkLoaded, user]);

  return <div className="chat" ref={chatboxDiv} />;
}

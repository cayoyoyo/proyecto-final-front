import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import Talk from 'talkjs';

function InboxPage() {
    const { user, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            const currentUser = new Talk.User({
                id: user._id,
                name: user.name,
                email: user.email,
                photoUrl: "henry.jpeg",
                welcomeMessage: "Hello!",
                role: "default",
            });



            Talk.ready.then(() => {
                const session = new Talk.Session({
                    // Configura la sesión TalkJS aquí con tus credenciales
                    appId: "tfLfNCYY",
                    me: currentUser,
                });

                const inbox = session.createInbox();
                inbox.mount(document.getElementById('inbox-container'));
            });
        }
    }, []);

    return (
        <div>
            <h1>Bandeja de Entrada</h1>
            <div id="inbox-container"></div>
        </div>
    );
}

export default InboxPage;

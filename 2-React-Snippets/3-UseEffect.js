// Your setup code (1 block) runs when your component is added to the page (mounts).
// After every re-render of your component where the dependencies (3 block) have changed:
// First, your cleanup code (2 block) runs with the old props and state.
// Then, your setup code (1 block) runs with the new props and state.
// Your cleanup code (2 - block) runs one final time after your component is removed from the page (unmounts).

import { useEffect } from "react";
import { createConnection } from "./chat.js";

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  useEffect(
    () => {
      // 1 - Start
      const connection = createConnection(serverUrl, roomId);
      connection.connect();
      // 1 - end
      return () => {
        // 2 - Start
        connection.disconnect();
        // 2- End
      };
    },
    // 3 - Start
    [serverUrl, roomId]
    // 3- End
  );
  // ...
}

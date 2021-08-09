import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import "./Chat.css";

const Chat = () => {
  const YOUR_APP_ID = "6512362F-3139-4945-A6B0-F5FE1C5CC916";
  const USER_ID = "1";
  return (
    <div className="Chat">
      <SendBirdApp
        // Add the two lines below.
        appId={YOUR_APP_ID}
        userId={USER_ID}
      />
    </div>
  );
};

export default Chat;

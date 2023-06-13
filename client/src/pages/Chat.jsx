import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import UserAvatar from "./../../components/UserAvatar";
import Logo from "../../components/Logo";

export default function Chat() {
  const [ws, setWS] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:4000");
    setWS(webSocket);

    webSocket.addEventListener("message", handleMessages);
  }, []);

  const handleMessages = (e) => {
    if (e.data instanceof Blob) {
      e.data.text().then(() => {
        // handle Blob
      });
    } else {
      setOnlineUsers(JSON.parse(e.data));
    }
  };

  const handleSelectedUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Start Your Chat</title>
      </Helmet>
      <div className="flex w-full h-screen">
        <div className="w-1/4 bg-slate-100">
          <a href="/">
            <Logo />
          </a>

          {Object.keys(onlineUsers).map((userId) => {
            const isSelectedUser = userId === selectedUserId;
            const username = onlineUsers[userId];
            return (
              <div
                key={userId}
                className={`ml-1 my-5 cursor-pointer text-xl ${
                  isSelectedUser && "bg-blue-200"
                }`}
              >
                <div
                  className="flex gap-x-2 items-center"
                  onClick={() => handleSelectedUser(userId)}
                >
                  <div
                    className={`h-12 pr-1 ${isSelectedUser && "bg-blue-500"}`}
                  ></div>
                  <UserAvatar userId={userId} username={username} />
                  {username}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-3/4 bg-blue-200 flex flex-col justify-between px-2">
          {!selectedUserId && (
            <div className="flex justify-center h-full items-center text-lg text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 pr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              select user to start chat
            </div>
          )}
          {selectedUserId && (
            <>
              <div className="text-lg py-2">
                Send message to{" "}
                <span className="font-bold">{onlineUsers[selectedUserId]}</span>
              </div>
              <div className="flex w-full items-center mb-2">
                <input
                  type="text"
                  className="w-full bg-white h-12 mr-2 p-2 border-none focus:outline-none"
                  placeholder="Write your message..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-11 h-12 cursor-pointer p-2 bg-blue-500 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

export default function Chat() {

  const [ws, setWS] = useState(null);
  
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:4000');
    setWS(webSocket);

    window.addEventListener('message', handleMessages);

  }, []);

  const handleMessages = (e) => {
    console.log(e);
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Start Your Chat</title>
      </Helmet>
      <div className="flex w-full h-screen">
        <div className="w-1/4 bg-slate-600"> Contacts </div>
        <div className="w-3/4 bg-blue-300 flex items-end">
          <div className="flex w-full items-center mx-3 mb-2">
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
        </div>
      </div>
    </HelmetProvider>
  );
}

import { HelmetProvider, Helmet } from "react-helmet-async";

export default function Chat() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Start Your Chat</title>
      </Helmet>
      <div className="flex w-full h-screen">
        <div className="w-1/4 bg-slate-600"> Contacts </div>
        <div className="w-3/4 bg-blue-300 flex items-end">
          <div className="flex w-full items-center mb-2">
            <input
              type="text"
              className="w-full rounded-lg bg-white h-12 mx-2 p-2"
              placeholder="Write your message..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

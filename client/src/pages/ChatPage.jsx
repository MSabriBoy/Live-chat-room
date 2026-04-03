import { useState, useEffect, useRef } from "react";
import { socket } from "../socket/socket";



const ChatPage = () => {
    const chatRef = useRef();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const [typingUser, setTypingUser] = useState("");
    const [room, setRoom] = useState("");
    

    // Receive messages
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("typing", (data) => {
            setTypingUser(data.author);

            setTimeout(() => {
                setTypingUser("");
            }, 3000);
        });

        return () => {
            socket.off("receive_message");
            socket.off("typing");
        };
    }, []);

    useEffect(() => {
  chatRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

    // Send message
    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("send_message", {
            author: username,
            message: message,
            room: room,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            date: new Date().toDateString(),
        });

        setMessage("");
    };
    if (!joined) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="mb-4 font-bold">Enter Your Name</h2>

                    <input
                        className="border p-2 mb-2 w-full"
                        placeholder="Your name..."
                        onChange={(e) => setUsername(e.target.value)}
                    />

   <select
          className="border p-2 mb-3 w-full"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="">Select Room</option>
          <option value="General">General</option>
          <option value="Tech">Tech</option>
        </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 w-full"
                         onClick={() => {
            if (!username || !room) return;
            socket.emit("join_room", room);
            setJoined(true);
          }}
                    >
                        Join Chat
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden">

            {/* Chat Box */}
            <div className="w-full max-w-md h-[500px] bg-white shadow-lg rounded-lg p-4 flex flex-col">

                <h2 className="text-xl font-bold mb-4 text-center">
                    Live Chat
                </h2>
<div className="flex justify-between items-center mb-2">
  <h2 className="text-lg font-bold">Room: {room}</h2>
  <span className="text-sm text-gray-500">User: {username}</span>
</div>
                {/* Messages */}
<div className="flex-1 overflow-y-auto border p-2 mb-3 rounded">

  {(() => {
    let lastDate = "";

    return messages.map((msg, index) => {
      const isOwn = msg.author === username;

      const showDate = msg.date !== lastDate;
      lastDate = msg.date;

      return (
        <div key={index}>

          {showDate && (
            <div className="text-center text-xs text-gray-400 my-2">
              {msg.date === new Date().toDateString()
                ? "Today"
                : msg.date}
            </div>
          )}

          {/* MESSAGE */}
          <div
            className={`flex ${
              isOwn ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                isOwn
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p className="text-xs font-semibold">{msg.author}:</p>

              <div className="flex justify-between items-end gap-2">
                <p className="text-sm">{msg.message}</p>
                <span className="text-[10px] opacity-70 whitespace-nowrap">
                  {msg.time}
                </span>
              </div>
            </div>
          </div>

        </div>
      );
    });
  })()}

  <div ref={chatRef} />

</div>
                {typingUser && (
                    <p className="text-sm text-gray-500">
                        {typingUser} is typing...
                    </p>
                )}

                {/* Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type message..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);

                            socket.emit("typing", { 
                                author: username,
                            room: room,
                         });
                        }}
                          onKeyDown={(e) => {
    if (e.key === "Enter") sendMessage();
  }}

                        className="flex-1 border rounded px-3 py-2 outline-none"
                    />

                    <button
                    disabled={!message.trim()}
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ChatPage;
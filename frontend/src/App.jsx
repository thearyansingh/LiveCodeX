import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
import { v4 as uuid } from "uuid";
import "./index.css";
import codeLogo from "./assets/CodeLogo.png";

const socket = io("http://localhost:5000");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [outPut, setOutPut] = useState("");
  const [version, setVersion] = useState("*");
  const [userInput, setUserInput] = useState("");

  // 🔹 Socket listeners
  useEffect(() => {
    socket.on("userJoined", (users) => {
      setUsers(users);
    });

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on("codeResponse", (response) => {
      setOutPut(response.run.output);
    });

    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
      socket.off("codeResponse");
    };
  }, []);

  // 🔹 Handle unload (leave room)
  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leaveRoom");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 🔹 Join Room
  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim() && userName.trim()) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    } else {
      alert("Please enter both Room ID and Username");
    }
  };

  // 🔹 Leave Room
  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start code here");
    setLanguage("javascript");
  };

  // 🔹 Copy Room Id
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  // 🔹 Code change
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (roomId) {
      socket.emit("codeChange", { roomId, code: newCode });
      socket.emit("typing", { roomId, userName });
    }
  };

  // 🔹 Language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    if (roomId) {
      socket.emit("languageChange", { roomId, language: newLanguage });
    }
  };

  // 🔹 Run Code
  const runCode = () => {
    if (!roomId) return;
    socket.emit("compileCode", {
      code,
      roomId,
      language,
      version,
      input: userInput,
    });
  };

  // 🔹 Create Room Id
  const createRoomId = () => {
    const newRoomId = uuid();
    setRoomId(newRoomId);
  };

  if (!joined) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <form
          onSubmit={joinRoom}
          className="w-full max-w-md p-6 rounded-2xl bg-[#1e1f29] shadow-2xl border hover:scale-105 transition-all duration-300 border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <img src={codeLogo} className="h-14 w-14" alt="Code Logo" />
            <div>
              <h1 className="text-2xl font-bold text-purple-400">LiveCodeX</h1>
              <p className="text-gray-400 text-sm">
                Real-time code editing platform for coders 🚀
              </p>
            </div>
          </div>

          {/* Room ID */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Room ID</label>
              <input
                type="text"
                placeholder="Enter Room ID"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button
                type="button"
                onClick={createRoomId}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-lg font-semibold"
              >
                Create Id
              </button>
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          {/* Join Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-lg font-semibold"
          >
            Join Room
          </button>
        </form>
      </div>
    );
  }


return (
  <div className="flex h-screen bg-gray-950 text-gray-200">
    {/* Sidebar */}
    <div className="w-72 bg-gray-900/80 backdrop-blur-md border-r border-gray-800 flex flex-col justify-between p-4">
      <div>
        {/* Room Info */}
         <div className="flex  items-center space-x-3 mb-6">
            <img src={codeLogo} className="h-14 w-14" alt="Code Logo" />
             <h1 className="text-2xl font-bold text-purple-400">LiveCodeX</h1>
            </div>
        <div className="space-y-2 mb-6">
          <h2 className="text-lg font-semibold text-white">Code Room: {roomId}</h2>
          <button
            onClick={copyRoomId}
            className="px-3 py-1 rounded-md bg-emerald-600/20 text-emerald-400 text-sm hover:bg-emerald-600/40 transition"
          >
            Copy ID
          </button>
          {copySuccess && (
            <span className="block text-xs text-emerald-400 mt-1">
              {copySuccess}
            </span>
          )}
        </div>

        {/* Users */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-white mb-2">Users in Room:</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            {users.map((user, index) => (
              <li
                key={index}
                className="px-2 py-1 rounded-md bg-gray-800/60 hover:bg-gray-700 transition"
              >
                {user.slice(0, 8)}...
              </li>
            ))}
          </ul>
        </div>

        {/* Typing Indicator */}
        {typing && (
          <p className="text-xs text-gray-400 italic animate-pulse">{typing}</p>
        )}

        {/* Language Selector */}
        <div className="mt-6">
          <label className="block text-sm mb-2 font-medium text-gray-300">
            Language
          </label>
          <select
            className="w-full p-2 rounded-lg bg-gray-800 text-gray-200 focus:ring-2 focus:ring-emerald-500"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>

      {/* Leave Button */}
      <button
        onClick={leaveRoom}
        className="mt-6 w-full py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 hover:text-red-300 transition"
      >
        Leave Room
      </button>
    </div>

    {/* Editor & Console */}
    <div className="flex flex-col flex-1">
      <div className="flex-grow border-b border-gray-800">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 16,
          }}
        />
      </div>

      {/* Input & Output Console */}
      <div className="h-1/3 p-4 bg-gray-900 flex flex-col gap-3">
        <textarea
          className="w-full flex-1 bg-gray-800 text-gray-200 rounded-lg p-2 resize-none"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter input here..."
        />
        <button
          onClick={runCode}
          className="self-end px-4 py-2 rounded-md bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 transition"
        >
          Execute
        </button>
        <textarea
          className="w-full flex-1 bg-gray-800 text-gray-300 rounded-lg p-2 resize-none"
          value={outPut}
          readOnly
          placeholder="Output will appear here..."
        />
      </div>
    </div>
  </div>
);

};

export default App;

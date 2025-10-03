   <div className="min-h-screen px-10 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <form onSubmit={joinRoom} className="w-full max-w-md p-6 rounded-2xl bg-[#1e1f29] shadow-2xl border hover:scale-105 transition-all duration-300 border-gray-700">
     
        <div className="flex items-center space-x-3 mb-6">
          <img src={codeLogo} className="h-14 w-14" alt="Code Logo" />
          <div>
            <h1 className="text-2xl font-bold text-purple-400">LiveCodeX</h1>
            <p className="text-gray-400 text-sm">
              Real-time code editing platform for coders 🚀
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Room ID
            </label>
            <input
              type="type"
              placeholder="Enter Room ID"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
              value={roomId}
              onChange={(e)=>setRoomId(e.target.value)}
            />
             <button
          onClick={createRoomId}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-lg font-semibold"
        >
          Create Id
        </button>

          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                value={userName}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-lg font-semibold"
        >
          Join Room
        </button>

    
      </form>
    </div>
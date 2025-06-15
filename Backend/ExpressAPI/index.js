const express   = require("express");
const mongoose  = require("mongoose");
const http      = require("http");
const cors      = require("cors");
const socketIo  = require("socket.io");        
const Chat      = require("./models/chat");
const Message   = require("./models/message");
const User      = require("./models/user"); 
const app       = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
require("dotenv").config();


const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));


io.on("connection", async (socket) => {

  const { userId } = socket.handshake.query;
  if (!userId) {
    socket.disconnect(true);
    return;
  }
  console.log(`User ${userId} connected via socket`);

  
  const chats = await Chat.find({ participants: userId }).select("_id");
  chats.forEach(c => socket.join(c._id.toString()));

 
  const chatSummaries = await Chat.aggregate([
    { $match: { participants: mongoose.Types.ObjectId(userId) }},
    { $lookup: {
        from: "messages",
        let: { chatId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$chat", "$$chatId"] } }},
          { $sort: { timestamp: -1 }},
          { $limit: 1 }
        ],
        as: "latest"
    }},
    { $project: {
        _id:       1,
        participants: 1,
        latest:   { $arrayElemAt: ["$latest", 0] }
    }}
  ]);
  socket.emit("chatsList", chatSummaries);

  
  socket.on("loadMessages", async ({ chatId }) => {
    const msgs = await Message.find({ chat: chatId })
                              .sort({ timestamp: 1 });
    socket.emit("messages", { chatId, messages: msgs });
  });

  s
  socket.on("sendMessage", async ({ chatId, text, username }) => {
    const msg = await Message.create({ chat: chatId, text, username });
    
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: msg._id }});
   
    io.to(chatId).emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
  });
});


app.get("/api/chat/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId)
    .populate("participants", "userid")
    .populate({
      path:    "messages",
      options: { sort: { timestamp: 1 } }
    });
  if (!chat) return res.status(404).send("Chat not found");
  res.json(chat);
});
app.post("/api/chats", async (req, res) => {
  const { participants } = req.body;
  const chat = await Chat.create({ participants, messages: [] });
  res.status(201).json(chat);
});


// Body: { username: "Alice", text: "Hello world" }
app.post("/api/chat/:chatId/Messages", async (req, res) => {
  const { chatId } = req.params;
  const { username, text } = req.body;
  const msg = await Message.create({ chat: chatId, username, text });
  
  await Chat.findByIdAndUpdate(chatId, { $push: { messages: msg._id } });
  res.status(201).json(msg);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
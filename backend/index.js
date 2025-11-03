/* eslint-disable @typescript-eslint/no-require-imports */

require('dotenv').config();
 

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json()); 
const messageschema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageschema);
// --- Connect MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

// --- Socket.IO setup ---
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
}); 

io.on('connection', (socket) => {
  console.log('🟢 user connected', socket.id);

  socket.on('chat message', async (data) => {
    const msg = new Message({ username: data.username, text: data.text });
    await msg.save();
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 user disconnected', socket.id);
  });
});

// --- REST route for old messages ---
app.get('/messages', async (req, res) => {
  const msgs = await Message.find().sort({ createdAt: 1 }).limit(100);
  res.json(msgs);
});

// --- Start Server ---
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const mongoose = require("mongoose");
const colors = require("colors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

//SERVER and DB--------------------------------
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to DB established".cyan.bold);
  });

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});

//SOCKET CONNETION
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket IO");
  //Initialization
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connection");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("Joined Room ", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing", room));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat;
    if (!chat.users) return console.log("Chat users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  socket.off("setup", () => {
    console.log("Disconnected");
    socket.leave(userData._id);
  });
});

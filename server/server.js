const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(`User: ${socket.id} connected`);
  socket.on("message", (data) => {
    console.log(socket.id, data);
    io.emit(`message`, `${socket.id.substring(0, 5)}: ${data}`);
    io.emit(`id`, `${socket.id.substring(0, 5)}`);
  });
});




// console.log(socket.id);

httpServer.listen(3500, () => console.log("listening on port 3500"));

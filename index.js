const express = require('./config/express');
const {logger} = require('./config/winston');
const http = require("http");
const app = express();
const server = http.createServer(app);
const Server = require("socket.io");
const moment = require("moment");
const io = Server(server);

const port = 3000;

console.log("test");

io.on("connection", (socket) =>{
    socket["nickname"] = "Anon";
    socket.onAny((event) => console.log(`Socket Event: ${event}`));
    socket.on("enter_room", (roomName) => {
        socket.join(roomName);
    })
    socket.on("new_message", (msg, room) => {
        socket.to(room).emit("new_message", socket.nickname, msg);
    })
    socket.on("nickname", (nickname) => socket["nickname"] = nickname);
});

server.listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
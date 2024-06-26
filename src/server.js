// 서버
import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket)=>{
    // console.log(socket);
    // socket.on("enter_room", (roomName)=>{console.log(roomName)})
    socket.on("enter_room", (roomName, done)=>{
        console.log(roomName)
        setTimeout(()=>{
            done()
        }, 5000);
    })
})

const handleListen = () => {console.log("Listening on http://localhost:3000")}
httpServer.listen(3000, handleListen);
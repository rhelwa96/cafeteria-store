"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = __importDefault(require("./routes/index"));
// import * as socketio from "socket.io";
var cors_1 = __importDefault(require("cors"));
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
var app = (0, express_1.default)();
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)()); // this enables preflight
//let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
// let io = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:3000"
//   }
// });
// io.on("connection", function(socket: any) {
//     console.log("a user connected");
//     // whenever we receive a 'message' we log it out
//     socket.on('order-added', (data:any)=> {
//       socket.broadcast.emit("receive_order",data)
//     });
//   });
//    console.log(message);
//     socket.on('disconnect', () => {
//       console.log(`socket ${socket.id} disconnected`);
//     })
//   });
// });
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/', index_1.default);
var PORT = 4000; // backend routing port
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "."));
});

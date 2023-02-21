import express from 'express' ;
import bodyParser from 'body-parser';
import routesHandler from './routes/index';
// import * as socketio from "socket.io";
import cors from 'cors'
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

const app = express();
 
// app.use(cors(corsOptions));
app.use(cors()); 
app.options('*', cors()); // this enables preflight
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
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
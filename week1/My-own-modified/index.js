"use strict";
// const http = require("http");
// // console.log(http.STATUS_CODES)
// const server = http.createServer((req, res) => {
//   console.log("Creating Server");
// });

// So the Basics are:
//  Found the (http) Object,
//  then creatServer && listen to a PORT

// const PORT = 4000;
// http.createServer(function (req, res) {
//   // res.setHeader()
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('Hey That is the file name '+ __filename.toString());
//   res.end();
//   // console.log(res.connection)
// }).listen(PORT);




// server.on("request", (req, res) => {
//   console.log(req.method, req.url); // IncomingMessage
//   console.log(req.headers); // IncomingMessage
  // console.log(res); // ServerResponse
  // switch (req.url) {
  //   case "/state":
  //     responseWrite(state, res)
  //     break;
  //   case "/add":
  //     responseWrite(state += 1, res);
  //     break;
  //   case "/remove":
  //     responseWrite(state -= 1, res);
  //     break;
  //   case "/reset":
  //     state = ORIGINAL  
  //     responseWrite(state, res);
  //   break;
  //   default:
  //     res.statusCode = 404
  //     responseWrite(res.statusCode, res);
  // }
// });
// server.on("response", (req, res) => {
//   // res.write("this is response")
//   // console.log("response", res.state)
// })
// server.on("connection", () => {
//  console.log("connected")
// });
// server.listen(PORT, () => {
//  console.log("lestening to", PORT)
// })
  
// function responseWrite(val, response) {
//   response.setHeader("content-type", "text/html");
//   response.write(`<h1>${val}</h1>`);
//   response.end()
// }

const path = require("path");
const util = require("util");
const v8 = require("v8");
util.log(path.basename("someone"));
console.log(v8.getHeapSpaceStatistics())
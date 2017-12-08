// main starting point of the application
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');


//App setup

const app = express();


// server setup
const PORT = process.env.PORT || 9999;


const server = http.createServer(app);
server.listen(PORT,()=>{
 
        console.log(`server has start up on port :${PORT}`);
    });

    
//   17到21 其實這樣寫就可以了
//    https://cnodejs.org/topic/5396cd60c3ee0b5820f00e2a

// app.listen(PORT,()=>{
//     console.log(`server has start up on port :${PORT}`);
// });    
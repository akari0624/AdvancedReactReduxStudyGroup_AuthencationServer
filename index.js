// main starting point of the application
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');


//App setup

const app = express();
app.use(morgan('combined'));


//  body-parser可以用多個  像 18行就是 解析 x-www-form-urlencoded用的bodyParser
//  不寫18行，這個express server就沒辦法接  x-www-form-urlencoded用的bodyParser型態的request,
//  req.body.requestParameterName....   body會變undefined
//  而且 urlencoded的bodyParser還必須設定在 json的bodyParser之前
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json({type:'*/*'})); 

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


app.post('/',(req,res,next)=>{


    console.log('theName :',req.body.name);

    res.send('you are pretty good');
});
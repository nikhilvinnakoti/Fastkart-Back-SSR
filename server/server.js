
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');





const corsOptions = {
    origin: 'http://localhost:4200', // Your Angular frontend URL
    credentials: true, // Allow cookies (like the refresh token) to be sent
};
  
  

const PORT = 3000;

const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json());
const api = require('./routes/api');
app.use('/fastkart', api);
app.get('/', (req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT,()=>{
    console.log('Server running on localhost:'+ PORT);
})



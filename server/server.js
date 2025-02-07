const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json());
const api = require('./routes/api');
app.use('/fastkart', api);
app.get('/', (req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT,()=>{
    console.log('Server running on localhost:'+ PORT);
})



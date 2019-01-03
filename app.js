const express = require('express');
const mongoose = require('./config/mongoose-connect');
const bodyparser = require('body-parser');
const cors = require('cors');
const user = require('./routes/userRouteBef');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());



app.use('/user',user);


app.get('/', (req,res) => {
    res.send("Hello app");
})

app.listen(3000, () => {
    console.log('Connected to server ');
})
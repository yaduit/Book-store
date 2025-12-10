const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const app = express();
const bookRoute = require('./routes/bookRoute');
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',function(req,res){
    res.send("hello world");
})

app.use('/book', bookRoute);

app.listen(port,function(req,res){
    console.log("PORT value:", process.env.PORT);

});
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

//  Middelware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(bodyParser.json());
app.use(require('./routes/index'));
// DB config

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true
},(err,res)=>{
    if(err) throw error;
    console.log(`Mongo is working ${6 +7}`)
});
app.listen(port, () => console.log(`running in the port ${port}`));
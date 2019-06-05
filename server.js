require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000

//  Middelware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended:false
}));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));
*/

app.use(bodyParser.json());
app.use(require('./routes/index'));
'mongo://localhost:27017/sga'
// DB config

mongoose.connect('mongodb://localhost:27017/sga', {
  useNewUrlParser: true
},(err,res)=>{
    if(err) throw error;
    console.log(`Mongo is working ${6 +7}`)
});
app.listen(process.env.PORT, () => console.log(`running in the port ${port}`));
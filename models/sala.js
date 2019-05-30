const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let userschema = new Schema({
    name:{
        type:String,
        required:[true,"El nombre es requerido"]
    },
    description:{
        type:String,
        required:[true,"La descripcion es requerida"]
    },
    state:{
        type:Boolean,
        default:true
    }
        
});

module.exports = mongoose.model('Sala',userschema);
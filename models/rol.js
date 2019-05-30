const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let rolschema = new Schema({
    name:{
        type:String,
        required:[true,"El nombre es requerido"]
    },
    description:{
        type:String,
        required:[true,"La descripcion es requerida"]
    }
        
});

module.exports = mongoose.model('Rol',rolschema);

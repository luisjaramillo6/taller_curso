const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let typeAccess = {
    values: ['ENTRADA','SALIDA'],
    message: '{value} no es valido para el acceso'
} 

let PermisoSchema = new Schema ({
    date:String,
    hour:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'Deberia ser asignado']
    },
    sala:{
        type:Schema.Types.ObjectId,
        ref:'Sala',
        required:[true,'Deberia ser asignado']
    },
    typeAccess:{
        type:String,
        enum:typeAccess
    },
    state:{
        type:Boolean,
        default:true
    }
});
module.exports = mongoose.model('PermisoAcceso',PermisoSchema);
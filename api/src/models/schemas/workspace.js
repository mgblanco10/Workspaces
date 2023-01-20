const { Schema, Types: { ObjectId }  } = require('mongoose')

const workspace = new Schema({

    location: {
        type: ObjectId,
        required: true,
        ref: 'Location'
    },

    name: {
        type: String,
        required: true
        
    },
    price:{
        type: Number,
        
    },
    image:{
        type: String,
        default: ''
    },
    description:{
        type: String, 
        default:''
    }
})

module.exports = workspace

//nombre de las salas quizzas ponerle nombre unique para evitar que dos salas se llamen igual
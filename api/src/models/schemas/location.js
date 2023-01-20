const { Schema } = require('mongoose')

const location = new Schema({

    name: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true

    }
})

module.exports = location
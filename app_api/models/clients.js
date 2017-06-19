

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Client Schema
 */
var ClientSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    tel: {
        type: String,
        // required: true
    },
    service: {
        type: String
    },
    price: {
        type: Number,
    },
    date: {
        type: Date
    },
    datetime: {
        type: Number
    },
    time: {
        type: Number
    },
    idservice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    idemploye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    type: {
        type: String,
    } ,
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now },
     confirm: {
    type: Boolean
    }
});


module.exports = mongoose.model('real_clients', ClientSchema);

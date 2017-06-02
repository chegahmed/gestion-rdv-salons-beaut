/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Rendezvous Schema
 */
var RendezvouSchema = new Schema({
    NameClient: {
        type: String,
        //  required: true
    },
    email: {
        type: String,
        default: ''
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
    time: {
        type: Number
    },
    idemploye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

RendezvouSchema.statics = {
    load: function (id, cb) {
        this.findOne({_id: id}).exec(cb);
    }
}


mongoose.model('Rendezvous', RendezvouSchema);
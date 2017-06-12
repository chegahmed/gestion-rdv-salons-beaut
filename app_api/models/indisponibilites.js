

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Indisponibilite Schema
 */
var IndisponibiliteSchema = new Schema({
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    cause: {
        type: String,
    },
    idemploye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now }
});

IndisponibiliteSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Indisponibilite', IndisponibiliteSchema);
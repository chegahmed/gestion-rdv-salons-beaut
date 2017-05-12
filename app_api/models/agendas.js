

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;




/**
 * Agenda Schema
 */
var childSchema = new Schema({  value: Boolean,
    content :String });

var AgendaSchema = new Schema({
    margetime: [childSchema],
    day :{
        type :String
    },
    order :{
        type :Number
    },
    rate: {
        type: Number
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    idemploye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now }
});

AgendaSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }
}


mongoose.model('Agenda', AgendaSchema);
//mongoose.model('child', childSchema);
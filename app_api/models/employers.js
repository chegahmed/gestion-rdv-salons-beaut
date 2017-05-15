

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var subsubagendaSchema = new Schema({
    value:Boolean,
    content :String,
    cause :String
})

var subagendaSchema = new Schema({
    day :String,
    margetime:[subsubagendaSchema]
})
/**
 * Employer Schema
 */
var EmployerSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        //unique: true,
       // required: true
        default :''
    },
    name: {
        type: String,
        required: true
    },
    idresponsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    idsalon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
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
    agenda : [subagendaSchema],
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now }
});

EmployerSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Employer', EmployerSchema);


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



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
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now }
});

EmployerSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Employer', EmployerSchema);
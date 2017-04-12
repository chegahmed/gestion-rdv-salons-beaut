

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength (v) {
    // a custom validation function for checking string length to be used by the model
    return v.length <= 150;
}


/**
 * Service Schema
 */
var SserviceSchema = new Schema({
    name: {
        type: String
    },
    service: {
        type: String
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now }
});

SserviceSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Sservice', SserviceSchema);
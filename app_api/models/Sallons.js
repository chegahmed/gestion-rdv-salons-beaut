

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



/**
 * SallonSchema
 */
var SallonSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        // make this a required field
        required: 'name cannot be blank',

    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now },
});


SallonSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Sallon', SallonSchema);
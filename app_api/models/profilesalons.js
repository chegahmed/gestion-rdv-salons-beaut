

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



/**
 * SalonSchema
 */
var ProfilesalonSchema = new Schema({
    idsalon: {
        type: String,
        default: '',
        trim: true,
        // make this a required field
        required: 'name cannot be blank',
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    tel: {
        type: Number,
        trim: true
    },
    description: {
        type: String,
        default: '',
    },
    ville: {
        type: String,
        default: '',
        trim: true
    },
    maps: {
        type: String,
        default: '',
        trim: true
    },
    startTime: {
        type: String
    },
    endTime: {
            type: String
        },
    idresponsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now },
});


ProfilesalonSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Profilesalon', ProfilesalonSchema);


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;




/**
 * Service Schema
 */
var ServicesalonSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    categorie: {
        type: String,

    },
    time: {
        type: Number,
        default: '',
        trim: true
    },
    price: {
        type: Number,
        default: '',
        trim: true
    },
    employe: {
        type: []

    },
    idsalon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    idservice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    isChecked :{
        type:Boolean,
        default:false,
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now }
});

ServicesalonSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Servicesalon', ServicesalonSchema);
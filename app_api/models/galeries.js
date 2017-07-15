

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;




/**
 * Service Schema
 */
var GalerieSchema = new Schema({

    image: {
        type: String,
        default:'',
        // make this a required field
        required: 'image cannot be blank',
    },
    idprofilesalon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    idresponsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now },
});

GalerieSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Galerie', GalerieSchema);
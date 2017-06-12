

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



/**
 * SalonSchema
 */
var SalonSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        // make this a required field
        required: 'name cannot be blank',
    },
    image: {
        type: String,
        default:'',
        // make this a required field
        required: 'image cannot be blank',
    },
    address: {
        type: String,
        default: '',
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
    rating: {
        type: Number,
    },
    categorie: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Categorie' }],
        trim: true,
    },
    scategorie: {
        type: [],
        trim: true
    },
    idresponsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now },
});


SalonSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Salon', SalonSchema);
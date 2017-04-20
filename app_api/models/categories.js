

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
var CategorieSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        unique : true,
        // make this a required field
        required: 'name cannot be blank',
        // wires in a custom validator function (http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate).
        validate: [validateLength, 'name must be 150 chars in length or less']
    },
    image: {
        type: String,
        default:'',
        // make this a required field
        required: 'image cannot be blank',
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id'
    },
    createdAt :{type : Date , default : Date.now },
    updatedAt :{type : Date , default : Date.now },
});

CategorieSchema.statics = {
    load: function(id,cb){
        this.findOne({_id : id}).exec(cb);
    }}


mongoose.model('Categorie', CategorieSchema);
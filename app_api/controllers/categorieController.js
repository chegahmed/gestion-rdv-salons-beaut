///Inject modules

require('../models/categories');
var mongoose =require('mongoose');
var _ = require('underscore');
var Categorie =mongoose.model("Categorie");
var multer = require('multer');
var namefile ="";

// uploading images
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        namefile =file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, namefile);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');


// save a new category
exports.post= function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        var categorie = new Categorie();
        categorie.name =req.body.name;
        categorie.image = namefile;
        categorie.parent =req.body.parent;
        categorie.save();

        res.json({error_code:0,err_desc:null});
    });
};

// edit a category  with an image
exports.putcatgwithimg = function(req, res) {
    Categorie.load(req.params.categorieId, function(err,categorie){
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }

            categorie.name =req.body.name;
            categorie.image = namefile;

        categorie.save(function(err){
            res.jsonp(categorie);
        });
    });
})
}


// find a category
exports.getCategorie = function(req,res){
    Categorie.find({"parent":null}).exec(function(err,categorie){
        res.jsonp(categorie);
    });
};
// find a sub-category
exports.getSousCategorie = function(req,res){
    Categorie.find({"parent":{$ne:null}}).exec(function(err,categorie){
        res.jsonp(categorie);
    });
};
// find all categories
exports.getAll = function(req,res){
    Categorie.find().exec(function(err,categorie){
        res.jsonp(categorie);
    });
};

// find last four categories
exports.getLastcatg = function(req,res){
    Categorie.find({"parent":null}).limit(4).sort({_id:-1}).exec(function(err,categorie){
        res.jsonp(categorie);
    });
};


// search a category
exports.search = function(req,res){
    Categorie.find({name : {'$regex': req.params.q},"parent":null}, function(err,categorie){
        res.jsonp(categorie);
    }) ;
};
// search a sub-category
exports.searchscatg = function(req,res){
    Categorie.find({name : {'$regex': req.params.q},"parent":{$ne:null}}, function(err,categorie){
        res.jsonp(categorie);
    }) ;
};

// show a category
exports.show = function(req,res){
    Categorie.load(req.params.categorieId, function(err,categorie){
        res.jsonp(categorie);
    });
};

// edit a category
exports.put = function(req,res){
    Categorie.load(req.params.categorieId, function(err,categorie){

        categorie = _.extend(categorie, req.body);

       categorie.save(function(err){
            res.jsonp(categorie);
        });
    });
};

// delete a category
exports.delete = function(req,res){
    Categorie.load(req.params.categorieId, function(err,categorie){
        categorie.remove(function(err){
            res.jsonp(categorie);
        });
    });
};

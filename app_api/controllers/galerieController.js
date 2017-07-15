///Inject modules

require('../models/galeries');
var mongoose =require('mongoose');
var _ = require('underscore');
var Galerie =mongoose.model("Galerie");
var multer = require('multer');
var namefile ="";

// uploading images
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads/galerie');
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




// edit a category  with an image
exports.post = function(req, res) {
    Galerie.load(req.params.galerieId, function(err,galerie){
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            var galerie =new Galerie();
console.log(req.body)
console.log(req.body.idprofilesalon)
console.log(namefile)
            galerie.idprofilesalon =req.body.idprofilesalon;
            galerie.idresponsable =req.body.idresponsable;
            galerie.image = namefile;

            galerie.save(function(err){
                res.jsonp(galerie);
            });
        });
    })
}


// find all galeries
exports.getAllbysalon = function(req,res){
    Galerie.find({idprofilesalon:req.params.idprofilesalon}).exec(function(err,galerie){
        res.jsonp(galerie);
    });
};


// find 3 lat element galeries
exports.getlastNelementbysalon = function(req,res){
    Galerie.find({idprofilesalon:req.params.idprofilesalon}).sort({ $natural: -1 }).limit(4).exec(function(err,galerie){
        res.jsonp(galerie);
    });
};



// show a category
exports.show = function(req,res){
    Galerie.load(req.params.galerieId, function(err,galerie){
        res.jsonp(galerie);
    });
};

// edit a category
exports.put = function(req,res){
    Galerie.load(req.params.galerieId, function(err,galerie){

        galerie = _.extend(galerie, req.body);

        galerie.save(function(err){
            res.jsonp(galerie);
        });
    });
};

// delete a category
exports.delete = function(req,res){
    Galerie.load(req.params.galerieId, function(err,galerie){
        galerie.remove(function(err){
            res.jsonp(galerie);
        });
    });
};

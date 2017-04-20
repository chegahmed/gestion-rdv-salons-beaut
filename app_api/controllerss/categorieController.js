require('../models/categories');
var mongoose =require('mongoose');
var _ = require('underscore');
var Categorie =mongoose.model("Categorie");

var multer = require('multer');


var namefile =""
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



exports.post= function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        var categorie = new Categorie();
        categorie.name =req.body.name;
        categorie.image = namefile;
      // categorie.parent = null;
        categorie.parent =req.body.parent;
        categorie.save();


        res.json({error_code:0,err_desc:null});
    });


};

exports.putcatgwithimg = function(req, res) {
    console.log('ici in server function putwimgmm')
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



exports.getCategorie = function(req,res){
    Categorie.find({"parent":null}).exec(function(err,categorie){
        res.jsonp(categorie);
    });
};

exports.getSousCategorie = function(req,res){
    Categorie.find({"parent":{$ne:null}}).exec(function(err,categorie){
        res.jsonp(categorie);
    });
};



exports.search = function(req,res){
    Categorie.find({name : {'$regex': req.params.q},"parent":null}, function(err,categorie){
        res.jsonp(categorie);
    }) ;
};

exports.searchscatg = function(req,res){
    Categorie.find({name : {'$regex': req.params.q},"parent":{$ne:null}}, function(err,categorie){
        res.jsonp(categorie);
    }) ;
};





exports.show = function(req,res){
    Categorie.load(req.params.categorieId, function(err,categorie){
        res.jsonp(categorie);
    });
};


exports.put = function(req,res){
    Categorie.load(req.params.categorieId, function(err,categorie){

        categorie = _.extend(categorie, req.body);

       categorie.save(function(err){
            res.jsonp(categorie);
        });
    });
};


exports.delete = function(req,res){
    Categorie.load(req.params.categorieId, function(err,categorie){
        categorie.remove(function(err){
            res.jsonp(categorie);
        });
    });
};

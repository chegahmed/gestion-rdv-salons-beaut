require('../models/villes');
var mongoose =require('mongoose');
var _ = require('underscore');
var Ville =mongoose.model("Ville");


exports.post = function(req ,res){
    console.log('ici post ville');
    var ville = new Ville(req.body);
    ville.save();
    res.jsonp(ville);
};



/*exports.get = function(req,res){
    Ville.paginate({}, { page: 1, limit: 3},function(err,ville){
        res.jsonp(ville);
    });
};*/

exports.get = function(req,res){
    Ville.find()
        .exec(function(err,ville){
            res.jsonp(ville);
        });
};


exports.show = function(req,res){
    Ville.load(req.params.villeId, function(err,ville){
        res.jsonp(ville);
    });
};


exports.put = function(req,res){
    Ville.load(req.params.villeId, function(err,ville){

        ville = _.extend(ville, req.body);

        ville.save(function(err){
            res.jsonp(ville);
        });
    });
};


exports.delete = function(req,res){
    Ville.load(req.params.villeId, function(err,ville){
        ville.remove(function(err){
            res.jsonp(ville);
        });
    });
};

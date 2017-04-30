//  Inject modules
require('../models/villes');
var mongoose =require('mongoose');
var _ = require('underscore');
var Ville =mongoose.model("Ville");


// save  City
exports.post = function(req ,res){
    console.log('ici post ville');
    var ville = new Ville(req.body);
    ville.save();
    res.jsonp(ville);
};


// search  City
exports.search = function(req,res){
    Ville.find({name : {'$regex': req.params.q}}, function(err,ville){
        res.jsonp(ville);
    }) ;
};



// get all  Cities
exports.get = function(req,res){
    Ville.find()
        .exec(function(err,ville){
            res.jsonp(ville);
        });
};


// get  City by id
exports.show = function(req,res){
    Ville.load(req.params.villeId, function(err,ville){
        res.jsonp(ville);
    });
};


// Edit  City By id
exports.put = function(req,res){
    Ville.load(req.params.villeId, function(err,ville){

        ville = _.extend(ville, req.body);

        ville.save(function(err){
            res.jsonp(ville);
        });
    });
};


// Delete City
exports.delete = function(req,res){
    Ville.load(req.params.villeId, function(err,ville){
        ville.remove(function(err){
            res.jsonp(ville);
        });
    });
};

//  Inject modules
require('../models/indisponibilites');
var mongoose =require('mongoose');
var _ = require('underscore');
var Indisponibilite =mongoose.model("Indisponibilite");


// save indisponibilite
exports.post = function(req ,res){
    var indisponibilite = new Indisponibilite(req.body);
    indisponibilite.save();
    res.jsonp(indisponibilite);
};


// get indisponibilite
exports.get = function(req,res){
    Indisponibilite.find().exec(function(err,indisponibilite){
        res.jsonp(indisponibilite);
    });
};


// search indisponibilite
exports.search = function(req,res){
    Indisponibilite.find({name : {'$regex': req.params.q}}, function(err,indisponibilite){
        res.jsonp(indisponibilite);
    }) ;
};


// get indisponibilite by id
exports.show = function(req,res){
    Indisponibilite.load(req.params.indisponibiliteId, function(err,indisponibilite){
        res.jsonp(indisponibilite);
    });
};


// edit indisponibilite
exports.put = function(req,res){
    Indisponibilite.load(req.params.indisponibiliteId, function(err,indisponibilite){

        indisponibilite = _.extend(indisponibilite, req.body);

        indisponibilite.save(function(err){
            res.jsonp(indisponibilite);
        });
    });
};

// delete indisponibilite
exports.delete = function(req,res){
    Indisponibilite.load(req.params.indisponibiliteId, function(err,indisponibilite){
        indisponibilite.remove(function(err){
            res.jsonp(indisponibilite);
        });
    });
};

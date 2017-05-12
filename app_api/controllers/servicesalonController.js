//  Inject modules
require('../models/servicesalons');
var mongoose =require('mongoose');
var _ = require('underscore');
var Servicesalon =mongoose.model("Servicesalon");


// save  Service provided
exports.post = function(req ,res){
    var servicesalon = new Servicesalon(req.body);
    servicesalon.save();
    res.jsonp(servicesalon);
};


// get all  Services provided
exports.get = function(req,res){
    Servicesalon.find().exec(function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};


// search  Service provided
exports.search = function(req,res){
    Servicesalon.find({name : {'$regex': req.params.q}}, function(err,servicesalon){
        res.jsonp(servicesalon);
    }) ;
};


// get one Service provided by id
exports.show = function(req,res){
    Servicesalon.load(req.params.servicesalonId, function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};


//get salon by idsalon and name service
exports.VerifierExistanceSalon = function(req,res){
    Servicesalon.find({idsalon : req.params.q,name : req.params.p}).exec(function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};


// Edit Service provided
exports.put = function(req,res){
    Servicesalon.load(req.params.servicesalonId, function(err,servicesalon){

        servicesalon = _.extend(servicesalon, req.body);

        servicesalon.save(function(err){
            res.jsonp(servicesalon);
        });
    });
};

// Delete Service provided
exports.delete = function(req,res){
    Servicesalon.load(req.params.servicesalonId, function(err,servicesalon){
        servicesalon.remove(function(err){
            res.jsonp(servicesalon);
        });
    });
};

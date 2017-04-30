//  Inject modules
require('../models/serviceproposers');
var mongoose =require('mongoose');
var _ = require('underscore');
var Serviceproposer =mongoose.model("Serviceproposer");


// save  Service provided
exports.post = function(req ,res){
    var serviceproposer = new Serviceproposer(req.body);
    serviceproposer.save();
    res.jsonp(serviceproposer);
};


// get all  Services provided
exports.get = function(req,res){
    Serviceproposer.find().exec(function(err,serviceproposer){
        res.jsonp(serviceproposer);
    });
};


// search  Service provided
exports.search = function(req,res){
    Serviceproposer.find({name : {'$regex': req.params.q}}, function(err,serviceproposer){
        res.jsonp(serviceproposer);
    }) ;
};


// get one Service provided by id
exports.show = function(req,res){
    Serviceproposer.load(req.params.serviceproposerId, function(err,serviceproposer){
        res.jsonp(serviceproposer);
    });
};


// Edit Service provided
exports.put = function(req,res){
    Serviceproposer.load(req.params.serviceproposerId, function(err,serviceproposer){

        serviceproposer = _.extend(serviceproposer, req.body);

        serviceproposer.save(function(err){
            res.jsonp(serviceproposer);
        });
    });
};

// Delete Service provided
exports.delete = function(req,res){
    Serviceproposer.load(req.params.serviceproposerId, function(err,serviceproposer){
        Serviceproposer.remove(function(err){
            res.jsonp(serviceproposer);
        });
    });
};

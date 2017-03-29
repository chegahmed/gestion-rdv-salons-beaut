require('../models/s_services');
var mongoose =require('mongoose');
var _ = require('underscore');
var S_service =mongoose.model("Sousservice");


exports.post = function(req ,res){
    console.log('ici post service');
    var s_service = new S_service(req.body);
    s_service.save();
    res.jsonp(s_service);
};



exports.get = function(req,res){
    S_service.find().exec(function(err,s_service){
        res.jsonp(s_service);
    });
};


exports.show = function(req,res){
    S_service.load(req.params.s_serviceId, function(err,s_service){
        res.jsonp(s_service);
    });
};


exports.put = function(req,res){
    S_service.load(req.params.s_serviceId, function(err,s_service){

        s_service = _.extend(s_service, req.body);

        S_service.save(function(err){
            res.jsonp(s_service);
        });
    });
};


exports.delete = function(req,res){
    S_service.load(req.params.s_serviceId, function(err,s_service){
        S_service.remove(function(err){
            res.jsonp(s_service);
        });
    });
};

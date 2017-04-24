require('../models/services');
var mongoose =require('mongoose');
var _ = require('underscore');
var Service =mongoose.model("Service");


exports.post = function(req ,res){
    console.log('ici post service');
    var service = new Service(req.body);
    service.save();
    res.jsonp(service);
};



exports.get = function(req,res){
    Service.find().exec(function(err,service){
        res.jsonp(service);
    });
};

exports.search = function(req,res){
    Service.find({name : {'$regex': req.params.q}}, function(err,service){
        res.jsonp(service);
    }) ;
};


exports.show = function(req,res){
    console.log("iciiiiiiii show service")
    Service.load(req.params.serviceId, function(err,service){
        res.jsonp(service);
    });
};


exports.put = function(req,res){
    Service.load(req.params.serviceId, function(err,service){

        service = _.extend(service, req.body);

        service.save(function(err){
            res.jsonp(service);
        });
    });
};


exports.delete = function(req,res){
    Service.load(req.params.serviceId, function(err,service){
        service.remove(function(err){
            res.jsonp(service);
        });
    });
};

require('../models/sservices');
var mongoose =require('mongoose');
var _ = require('underscore');
var Sservice =mongoose.model("Sservice");


exports.post = function(req ,res){
    console.log('ici post service');
    var service = new Sservice(req.body);
    service.save();
    res.jsonp(service);
};



exports.get = function(req,res){
    Sservice.find().exec(function(err,service){
        res.jsonp(service);
    });
};


exports.show = function(req,res){
    Sservice.load(req.params.sserviceId, function(err,sservice){
        res.jsonp(sservice);
    });
};


exports.put = function(req,res){
    Sservice.load(req.params.sserviceId, function(err,sservice){

        sservice = _.extend(sservice, req.body);

        sservice.save(function(err){
            res.jsonp(sservice);
        });
    });
};


exports.delete = function(req,res){
    Sservice.load(req.params.sserviceId, function(err,sservice){
        sservice.remove(function(err){
            res.jsonp(sservice);
        });
    });
};

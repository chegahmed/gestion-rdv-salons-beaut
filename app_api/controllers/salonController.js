require('../models/salons');
var mongoose =require('mongoose');
var _ = require('underscore');
var Salon=mongoose.model("Salon");



exports.post = function(req ,res){
    var salon = new Salon(req.body);
    salon.save();
    res.jsonp(salon);
};


exports.search = function(req,res){
    Salon.find({name : {'$regex': req.params.q}}, function(err,salon){
        res.jsonp(salon);
    }) ;
};

exports.get = function(req,res){
    Salon.find().exec(function(err,salon){
        res.jsonp(salon);
    });
};

exports.show = function(req,res){
    Salon.load(req.params.salonId, function(err,salon){
        res.jsonp(salon);
    });
};


exports.put = function(req,res){
    Salon.load(req.params.salonId, function(err,salon){

        salon = _.extend(salon, req.body);

        salon.save(function(err){
            res.jsonp(salon);
        });
    });
};


exports.delete = function(req,res){
    Salon.load(req.params.salonId, function(err,salon){
        salon.remove(function(err){
            res.jsonp(salon);
        });
    });
};

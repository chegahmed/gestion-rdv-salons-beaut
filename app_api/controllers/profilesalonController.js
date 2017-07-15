//  Inject modules
require('../models/profilesalons');
var mongoose =require('mongoose');
var _ = require('underscore');
var Profilesalon =mongoose.model("Profilesalon");


// save profilesalon
exports.post = function(req ,res){
    var profilesalon = new Profilesalon(req.body);
    profilesalon.save();
    res.jsonp(profilesalon);
};


// get profilesalon
exports.get = function(req,res){
    Profilesalon.find().exec(function(err,profilesalon){
        res.jsonp(profilesalon);
    });
};


// search profilesalon
exports.search = function(req,res){
    Profilesalon.find({name : {'$regex': req.params.q}}, function(err,profilesalon){
        res.jsonp(profilesalon);
    }) ;
};


// get profilesalon by id
exports.show = function(req,res){
    Profilesalon.load(req.params.profilsalonId, function(err,profilesalon){
        res.jsonp(profilesalon);
    });
};


// get profilesalon by id salon
exports.showbysalon = function(req,res){
    Profilesalon.findOne({idsalon:req.params.salonId}, function(err,profilesalon){
        res.jsonp(profilesalon);
    });
};


// get All profilesalon by id responsable
exports.getAllprofilesalon = function(req,res){
    Profilesalon.find({idresponsable:req.params.responsableId}, function(err,profilesalon){
        res.jsonp(profilesalon);
    });
};


// edit profilesalon
exports.put = function(req,res){
    Profilesalon.load(req.params.profilsalonId, function(err,profilesalon){

        profilesalon = _.extend(profilesalon, req.body);

        profilesalon.save(function(err){
            res.jsonp(profilesalon);
        });
    });
};


// delete profilesalon
exports.delete = function(req,res){
    Profilesalon.load(req.params.profilsalonId, function(err,profilesalon){
        profilesalon.remove(function(err){
            res.jsonp(profilesalon);
        });
    });
};

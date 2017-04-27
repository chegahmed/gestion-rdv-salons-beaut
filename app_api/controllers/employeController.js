require('../models/employers');
var mongoose =require('mongoose');
var _ = require('underscore');
var Employer =mongoose.model("Employer");


exports.post = function(req ,res){
    console.log('ici post employer');
    var employer = new Employer(req.body);
    employer.save();
    res.jsonp(employer);
};


exports.search = function(req,res){
    Employer.find({idresponsable : req.params.idr},{name : {'$regex': req.params.q}}, function(err,employer){
        res.jsonp(employer);
    }) ;
};




exports.get = function(req,res){
    Employer.find()
        .exec(function(err,employer){
            res.jsonp(employer);
        });
};

exports.getAllMyEmploye = function(req,res){
    Employer.find({idresponsable : req.params.responsableId}).exec(function(err,employer){
        res.jsonp(employer);
    });
};


exports.show = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){
        res.jsonp(employer);
    });
};


exports.put = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){

        employer = _.extend(employer, req.body);

        employer.save(function(err){
            res.jsonp(employer);
        });
    });
};


exports.delete = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){
        employer.remove(function(err){
            res.jsonp(employer);
        });
    });
};

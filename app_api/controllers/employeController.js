//  Inject modules
require('../models/employers');
var mongoose =require('mongoose');
var _ = require('underscore');
var Employer =mongoose.model("Employer");


// save employee
exports.post = function(req ,res){
    console.log('ici post employer');
    var employer = new Employer(req.body);
    employer.save();
    res.jsonp(employer);
};


// search employee
exports.search = function(req,res){
    Employer.find({idresponsable : req.params.idr},{name : {'$regex': req.params.q}}, function(err,employer){
        res.jsonp(employer);
    }) ;
};



// get all employees
exports.get = function(req,res){
    Employer.find()
        .exec(function(err,employer){
            res.jsonp(employer);
        });
};


// get all  employee for specific user
exports.getAllMyEmploye = function(req,res){
    Employer.find({idresponsable : req.params.responsableId}).exec(function(err,employer){
        res.jsonp(employer);
    });
};


// get employee by id
exports.show = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){
        res.jsonp(employer);
    });
};


// edit employee
exports.put = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){

        employer = _.extend(employer, req.body);

        employer.save(function(err){
            res.jsonp(employer);
        });
    });
};


// delete employee
exports.delete = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){
        employer.remove(function(err){
            res.jsonp(employer);
        });
    });
};

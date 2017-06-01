//  Inject modules
require('../models/employers');
var mongoose =require('mongoose');
var _ = require('underscore');
var Employer =mongoose.model("Employer");


// save employee
exports.post = function(req ,res){
  var  weeks=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
agenda =[];
    _.each(weeks, function (d) {
        req.body.day=d;
        console.log(req.body.day);
        agenda.push({
            day : req.body.day,
            margetime:req.body.margetime
        })
    })
req.body.agenda=agenda;
    console.log(JSON.stringify(req.body.agenda));
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


// get all marge for specific user
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


// get object in document margetime  by id  employe and id agenda and id object in document margetime
exports.showsub = function(req,res){
    Employer.load(req.params.employerId, function(err,agenda){
        var doc = agenda.agenda.id(req.params.subid);
        var result = doc.margetime.id(req.params.subsubid);
        res.jsonp(result);
    });
};


// edit sub margetime in attribut agenda
exports.putsub = function(req,res){

    Employer.findById(req.params.employerId, function (e, data) {
        if (e) console.log(e);
        var t = data.agenda.id(req.params.subid).margetime.id(req.params.subsubid);
        t.content = req.body.content;
        t.value = req.body.value;
        t.cause = req.body.cause;
        res.jsonp(t)
        data.save();
    });

};


// edit employee
exports.put = function(req,res){
    Employer.load(req.params.employerId, function(err,employer){
    var    weeks=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
        agenda =[];
        _.each(weeks, function (d) {
            req.body.day=d;
            console.log(req.body.day);
            agenda.push({
                day : req.body.day,
                margetime:req.body.margetime
            })
        })
        req.body.agenda=agenda;
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

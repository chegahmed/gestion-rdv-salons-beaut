//  Inject modules
require('../models/salons');
require('../models/servicesalons');
require('../models/services');

var mongoose = require('mongoose');
var _ = require('underscore');
var Salon = mongoose.model("Salon");
var ServiceSalon = mongoose.model("Servicesalon");
var Service = mongoose.model("Service");


// save salon
exports.post = function (req, res) {
    var salon = new Salon(req.body);
    salon.save();
    res.jsonp(salon);
};


// search salon
exports.search = function (req, res) {
    Salon.find({name: {'$regex': req.params.q}}, function (err, salon) {
        res.jsonp(salon);
    });
};

// get all salons
exports.get = function (req, res) {
    Salon.find().exec(function (err, salons) {
        res.jsonp(salons);
    });
};


//// get all salon salon for specific
exports.getAllMySallon = function (req, res) {
    var salonId = req.params.userId;
    var servicesalons = {};

    Salon.find({idresponsable: req.params.userId}).exec(function (err, salons) {
        ServiceSalon.find().exec(function (err, allServicesSalons) {
            _.each(salons, function (s) {
                servicesalons[s._id] = {};
                var servSalons = _.filter(allServicesSalons, function(d){
                   return d.idsalon.equals(s._id);
                });
                _.each(servSalons, function (d) {
                    servicesalons[s._id][d.idservice] = {//service
                        isChecked: d.isChecked,
                        name: d.name,
                        categorie: d.categorie,
                        time: d.time,
                        price: d.price,
                        employe: d.employe
                    };
                });
            });

            res.json({salons: salons, servicesalons: servicesalons});
        });

    });
};


//// get all salon salon for specific
exports.getAllSallonByUser = function(req,res){
    Salon.find({idresponsable : req.params.userId}).exec(function(err,salon){
        res.jsonp(salon);
    });
};


// get salon by id
exports.show = function (req, res) {
    Salon.load(req.params.salonId, function (err, salon) {
        res.jsonp(salon);
    });
};


// edit salon
exports.put = function (req, res) {
    Salon.load(req.params.salonId, function (err, salon) {

        salon = _.extend(salon, req.body);

        salon.save(function (err) {
            res.jsonp(salon);
        });
    });
};


// delete  salon
exports.delete = function (req, res) {
    Salon.load(req.params.salonId, function (err, salon) {
        salon.remove(function (err) {
            res.jsonp(salon);
        });
    });
};

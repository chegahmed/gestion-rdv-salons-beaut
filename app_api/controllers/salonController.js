//  Inject modules
require('../models/salons');
require('../models/servicesalons');
require('../models/services');

var mongoose = require('mongoose');
var _ = require('underscore');
var Salon = mongoose.model("Salon");
var ServiceSalon = mongoose.model("Servicesalon");
var Service = mongoose.model("Service");
var multer = require('multer');
var namefile ="";


// uploading images
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        namefile =file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, namefile);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');



// save salon
exports.post = function (req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        console.log(req.body)

        var salon = new Salon();
        salon.image = namefile;
        salon.name = req.body.name;
        salon.address = req.body.address;
        salon.description = req.body.description;
        salon.ville = req.body.ville;
        salon.scategorie = req.body.scategorie;
        salon.categorie = req.body.categorie;
        salon.idresponsable = req.body.idresponsable;

        salon.save();

        res.json({error_code:0,err_desc:null});
    });

  //  res.json({error_code:0,err_desc:null});
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
                console.log(servSalons)
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


// edit a salon  with an image
exports.putsalonwithimg = function(req, res) {
    Salon.load(req.params.salonId, function(err,salon){
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }


            salon.image = namefile;
            salon.name = req.body.name;
            salon.address = req.body.address;
            salon.description = req.body.description;
            salon.ville = req.body.ville;
            salon.scategorie = req.body.scategorie;
            salon.categorie = req.body.categorie;
            salon.idresponsable = req.body.idresponsable;


            salon.save(function(err){
                res.jsonp(salon);
            });
        });
    })
}


// delete  salon
exports.delete = function (req, res) {
    Salon.load(req.params.salonId, function (err, salon) {
        salon.remove(function (err) {
            res.jsonp(salon);
        });
    });
};


/////////////////here for front office//////

// get all salons by ville
exports.getSalonByVille = function (req, res) {
    Salon.find({ville:req.params.ville}).exec(function (err, salons) {
        res.jsonp(salons);
    });
};























require('../models/categories');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 //  Inject modules
require('../models/servicesalons');
var mongoose =require('mongoose');
var _ = require('underscore');
var Categorie =mongoose.model("Categorie");
var Servicesalon =mongoose.model("Servicesalon");


// save  Service provided
exports.post = function(req ,res){
    var servicesalon = new Servicesalon(req.body);
    servicesalon.save();
    res.jsonp(servicesalon);
};


// get all  Services provided
exports.get = function(req,res){
    Servicesalon.find().exec(function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};


// search  Service provided
exports.search = function(req,res){
    Servicesalon.find({name : {'$regex': req.params.q}}, function(err,servicesalon){
        res.jsonp(servicesalon);
    }) ;
};


// get one Service provided by id
exports.show = function(req,res){
    Servicesalon.load(req.params.servicesalonId, function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};


//get salon by idsalon and name service
exports.VerifierExistanceSalon = function(req,res){
    Servicesalon.findOne({idsalon : req.params.q,idservice : req.params.p}).exec(function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};


// Edit Service provided
exports.put = function(req,res){
    Servicesalon.load(req.params.servicesalonId, function(err,servicesalon){

        servicesalon = _.extend(servicesalon, req.body);

        servicesalon.save(function(err){
            res.jsonp(servicesalon);
        });
    });
};

// Delete Service provided
exports.delete = function(req,res) {
    Servicesalon.load(req.params.servicesalonId, function (err, servicesalon) {
        servicesalon.remove(function (err) {
            res.jsonp(servicesalon);
        });
    })

}


    //////////////////////////////////////ici pour front office////////////////////////////////


// get all  Services provided
exports.getServicesalonByidsalon = function(req,res){
    Servicesalon.find({idsalon:req.params.idsalon}).exec(function(err,servicesalon){
        res.jsonp(servicesalon);
    });
};

exports.getCategorieByidsalonandsalonservice = function(req,res){
    var catgarray=[];
    var scatgarray=[];
  Servicesalon.find({idsalon:req.params.idsalon}).exec(function(err,servicesalon){
      Categorie.find().exec(function(err,categorie){
          //res.jsonp(categorie)
              _.each(categorie, function (cat) {
                  _.each(servicesalon, function (service) {
                      var arraycatg = service.categorie.split(" --> ");
                      var catg =arraycatg[0];
                      var scatg =arraycatg[1];
                  if(catg == cat.name){
                      catgarray.push(cat)
                  }
                  if(scatg == cat.name){
                      scatgarray.push(cat)
                  }
              })

          })
          res.jsonp( {categories:_.uniq(catgarray),souscategories:_.uniq(scatgarray)});
      })

    });
};





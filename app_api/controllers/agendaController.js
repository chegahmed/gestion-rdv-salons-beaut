//  Inject modules
require('../models/agendas');
var mongoose =require('mongoose');
var _ = require('underscore');
var Agenda =mongoose.model("Agenda");


// save agenda
exports.post = function(req ,res){
    var agenda = new Agenda(req.body);
    agenda.save();
    res.jsonp(agenda);
};

// save agenda by day
exports.postByDay = function(req ,res){
    req.body.day =req.params.day;
    var agenda = new Agenda(req.body);
    agenda.save();
    res.jsonp(agenda);



};


// get agenda
exports.get = function(req,res){
    Agenda.find().exec(function(err,agenda){
        res.jsonp(agenda);
    });
};




// search agenda
exports.search = function(req,res){
    Agenda.find({name : {'$regex': req.params.q}}, function(err,agenda){
        res.jsonp(agenda);
    }) ;
};


// get agenda by id
exports.show = function(req,res){
    Agenda.load(req.params.agendaId, function(err,agenda){
        res.jsonp(agenda);
    });
};

// get object in table margetime  by id  agenda and id object in table margetime
exports.showsub = function(req,res){
    Agenda.load(req.params.agendaId, function(err,agenda){
        var doc = agenda.margetime.id(req.params.subid);
        res.jsonp(doc);
    });
};

// get agenda by id employe
exports.getAgendaByIdEmploye = function(req,res){
    Agenda.find({idemploye : req.params.q}, function(err,agenda){
        res.jsonp(agenda);
    });
};

// edit agenda by idemploye
exports.putByIdEmploye = function(req,res){
    Agenda.find({idemploye : req.params.q}, function(err,agenda){
        res.jsonp(agenda);
     /*  weeks=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
        for(var i=0;i<weeks.length;i++){
            console.log('ici N° :'+i +' '+weeks[i])
            Agenda.update({
                "day" : weeks[i],
            },{"$set": {"margetime.$": req.body}}, function (err,data) {
                res.jsonp(data);
                //res.jsonp(req.body);
            });
        }*/
        agenda = _.extend(agenda, req.body);

        agenda.save(function(err){
            res.jsonp(agenda);
        });
    });
};


// edit agenda
exports.put = function(req,res){
    Agenda.load(req.params.agendaId, function(err,agenda){

        agenda = _.extend(agenda, req.body);

        agenda.save(function(err){
            res.jsonp(agenda);
        });
    });
};

// edit sub margetime in agenda
exports.putsub = function(req,res){
    Agenda.update({
        "_id" : req.params.agendaId,
        "margetime._id" :req.params.subid
    },{"$set": {"margetime.$": req.body}}, function (err,data) {
       // res.jsonp(data);
        res.jsonp(req.body);
    });
};
/*    Agenda.findOne({ _id: req.params.agendaId }).populate('margetime').exec(function (err, data) {
 var perm =  data.margetime.id(req.params.subid);
 console.log(perm)
 _.extend(perm, req.body);

 data.markModified("margetime");
 data.save();
 });*/



// edit agenda by id employe and content item margetime
exports.putByIdemployeand = function(req,res){

    Agenda.find({_id: req.params.idagenda}, function(err,agenda){
       // console.log(req.body)
//console.log(agenda.length)
      //  _.findWhere(publicServicePulitzers, {newsroom: "The New York Times"});//
      //  if(req.body.margetime.content == req.params.cont)
        res.jsonp(agenda.margetime);
      /*  agenda = _.extend(agenda.margetime, req.body.margetime);

        agenda.save(function(err){
            res.jsonp(agenda);
        });*/
    });
};

// delete agenda
exports.delete = function(req,res){
    Agenda.load(req.params.agendaId, function(err,agenda){
        agenda.remove(function(err){
            res.jsonp(agenda);
        });
    });
};













//code sabire.19.08
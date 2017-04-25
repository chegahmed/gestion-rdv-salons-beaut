require('../models/users');
var mongoose =require('mongoose');
var _ = require('underscore');
var User=mongoose.model("User");



exports.post = function(req ,res){
    console.log('ici post user');
    var user = new User(req.body);
    user.save().error(function () {
        console.log("error user dosen't saved")
    })
    res.jsonp(user);
};

/*exports.get = function(req,res){
    User.paginate({}, { offset: 20, limit: 10 },function(err,user){
        res.jsonp(user);
    });
};*/



exports.search = function(req,res){
    User.find({name : {'$regex': req.params.q}}, function(err,user){
        res.jsonp(user);
    }) ;
};

exports.get = function(req,res){
    User.find().exec(function(err,user){
        res.jsonp(user);
    });
};

exports.show = function(req,res){
    User.load(req.params.userId, function(err,user){
        res.jsonp(user);
    });

};



exports.put = function(req,res){
    User.load(req.params.userId, function(err,user){

        user = _.extend(user, req.body);

        user.save(function(err){
            res.jsonp(user);
        });
    });
};


exports.delete = function(req,res){
    User.load(req.params.userId, function(err,user){
        user.remove(function(err){
            res.jsonp(user);
        });
    });
};

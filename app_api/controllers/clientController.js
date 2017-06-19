//  Inject modules
require('../models/clients');
var mongoose =require('mongoose');
//var _ = require('underscore');
var Client=mongoose.model("real_clients");
var nev = require('../config/index')(mongoose);

// NEV configuration =====================
nev.configure({
    persistentUserModel: Client,
    expirationTime: 600, // 10 minutes

    verificationURL: 'http://localhost:3000/routefrontoffice/email-verification/${URL}',
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'chegaahmed@gmail.com',
            pass: 'testmail'
        }
    },

 /*   hashingFunction: myHasher,
    passwordFieldName: 'pw',*/
}, function(err, options) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(Client, function(err, tempUserModel) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});


exports.post =  function(req, res) {
    if (req.body.type === 'register') {
    var email = req.body.email;
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var tel = req.body.tel;
    var idservice = req.params.idservice;
    var service = req.params.service;
    var price = req.params.price;
    var date = req.params.date;
    var datetime = req.params.datetime;
    var time = req.params.time;
    var idemploye =req.params.idemploye;

    var newClient = new Client({
        email: email,
        tel:tel,
        firstname: fname,
        lastname: lname,
        idservice: idservice,
        service: service,
        price: price,
        date: date,
        datetime: datetime,
        time: time,
        idemploye:idemploye,
        confirm:false
    });

        nev.createTempUser(newClient, function(err, existingPersistentUser, newTempUser) {
            if (err) {
                return res.status(404).send('ERROR: creating temp user FAILED');
            }

            // user already exists in persistent collection
            /*    if (existingPersistentUser) {
             return res.json({
             msg: 'You have already signed up and confirmed your account. Did you forget your password?'
             });
             }*/

            // new user created
            //  if (newTempUser) {
            var URL = newTempUser[nev.options.URLFieldName];

            nev.sendVerificationEmail(email, URL, function(err, info) {
                if (err) {
                    return res.status(404).send('ERROR: sending verification email FAILED');
                }
                res.json({
                    msg: 'An email has been sent to you. Please check it to verify your account.',
                    info: info
                });
            });

            // user already exists in temporary collection!
            /*  } else {
             res.json({
             msg: 'You have already signed up. Please check your email to verify your account.'
             });
             }*/
        });

        // resend verification button was clicked
    } else {
        nev.resendVerificationEmail(email, function(err, userFound) {
            if (err) {
                return res.status(404).send('ERROR: resending verification email FAILED');
            }
            if (userFound) {
                res.json({
                    msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                });
            } else {
                res.json({
                    msg: 'Your verification code has expired. Please sign up again.'
                });
            }
        });
    }
}



exports.postee =  function(req, res) {
    var email = req.body.email;

    // register button was clicked
    if (req.body.type === 'register') {
        var fname = req.body.firstname;
        var lname = req.body.lastname;
        var idservice = req.body.idservice;
        var service = req.body.service;
        var price = req.body.price;
        var date = req.body.date;
        var datetime = req.body.datetime;
        var time = req.body.time;
        var idemploye = req.body.idemploye;



        var newClient = new Client({
            email: email,
            firstname: fname,
            lastname: lname,
            idservice: idservice,
            service: service,
            price: price,
            date: date,
            datetime: datetime,
            time: time,
            confirm:false
        });

        nev.createTempUser(newClient, function(err, existingPersistentUser, newTempUser) {
            if (err) {
                return res.status(404).send('ERROR: creating temp user FAILED');
            }

            // user already exists in persistent collection
        /*    if (existingPersistentUser) {
                return res.json({
                    msg: 'You have already signed up and confirmed your account. Did you forget your password?'
                });
            }*/

            // new user created
          //  if (newTempUser) {
                var URL = newTempUser[nev.options.URLFieldName];

                nev.sendVerificationEmail(email, URL, function(err, info) {
                    if (err) {
                        return res.status(404).send('ERROR: sending verification email FAILED');
                    }
                    res.json({
                        msg: 'An email has been sent to you. Please check it to verify your account.',
                        info: info
                    });
                });

                // user already exists in temporary collection!
          /*  } else {
                res.json({
                    msg: 'You have already signed up. Please check your email to verify your account.'
                });
            }*/
        });

        // resend verification button was clicked
    } else {
        nev.resendVerificationEmail(email, function(err, userFound) {
            if (err) {
                return res.status(404).send('ERROR: resending verification email FAILED');
            }
            if (userFound) {
                res.json({
                    msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                });
            } else {
                res.json({
                    msg: 'Your verification code has expired. Please sign up again.'
                });
            }
        });
    }
};



// user accesses the link that is sent

exports.get =  function(req, res) {
    var url = req.params.URL;

    nev.confirmTempUser(url, function(err, user) {
        if (user) {
            nev.sendConfirmationEmail(user.email, function(err, info) {
                if (err) {
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                res.json({
                    msg: 'CONFIRMED!',
                    info: info
                });
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
};

















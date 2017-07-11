//  Inject modules
require('../models/rendezvous');
require('../models/employers');
require('../models/servicesalons');
require('../models/indisponibilites');

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var _ = require('underscore');
var moment = require('moment');
var Rendezvous = mongoose.model("Rendezvous");
var Employer = mongoose.model("Employer");
var Service = mongoose.model("Servicesalon");
var Indispo = mongoose.model("Indisponibilite");
var nev = require('../config/index')(mongoose)



// NEV configuration =====================
nev.configure({
    persistentUserModel: Rendezvous,
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

nev.generateTempUserModel(Rendezvous, function(err, tempUserModel) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});





// save rendezvous
exports.postRDV =  function(req, res) {
    console.log('ici rdv confirmation')

    Employer.load(req.params.idemploye, function (err, employe) {

        var idresponsable=employe.idresponsable;


        if (req.body.type === 'register') {

            console.log('idresponsable='+idresponsable);
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

            var newClient = new Rendezvous({
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
                idresponsable:idresponsable,
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



    });




}







// save rendezvous
exports.post = function (req, res) {
    var rendezvous = new Rendezvous(req.body);
    rendezvous.save();
    res.jsonp(rendezvous);
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



// get rendezvous by responsable sallon
exports.getAllRDVByUser = function (req, res) {
    Rendezvous.find({idresponsable: req.params.iduser,confirm:true}).exec(function (err, rendezvous) {
        res.jsonp(rendezvous);
    });

};

// get rendezvous by responsable sallon
exports.getAllRDVNotConfirmByUser = function (req, res) {
    Rendezvous.find({idresponsable: req.params.iduser,confirm:false}).exec(function (err, rendezvous) {
        res.jsonp(rendezvous);
    });

};


/**
 *
 * @param requestedDate momentjs instance
 * @param employer Employer instance
 * @return boolean
 */
function isEmplAvailable(employer, requestedDate) {
    starthEmpl = moment(employer.startTime).format('HH')
    endhEmpl = moment(employer.endTime).format('HH')
    var houre = requestedDate.format('HH')

    return houre < starthEmpl || houre > endhEmpl
}

/*
 // get rendezvous
 exports.ChercherRDV = function (req, res) {

 var idEmp = '59006181fa528b0bb8874878'
 var requestedDate = moment(req.params.date);//min date
 var requestedServiceId = ''

 requestedDate.locale('fr');
 var day = requestedDate.format('dddd') // => ('Lundi' , 'Mardi' ----)
 var month = requestedDate.format('MMMM') // => ('Janvier','Fevrier.....)
 var year = requestedDate.format('YYYY') // => ('2012','2013' ...)
 var houre = requestedDate.format('HH')
 var minute = requestedDate.format('mm');
 var result = [];


 console.log("day " + day + " month " + month + " year " + year + 'houre ' + houre + 'minutes ' + minute)

 Employer.findOne({_id: idEmp})
 .exec(function (err, employer) {

 /!*  if(_.isEmpty(employer)){
 res.jsonp({
 'null':'No employee was registered by this identifier'
 });
 }else{*!/
 // console.log(employer.agenda)

 starthEmpl = moment(employer.startTime).format('HH')
 endhEmpl = moment(employer.endTime).format('HH')

 if (!isEmplAvailable(employer, requestedDate)) {
 res.jsonp({
 "msg": 'heure que vous avez choisi et hour marge de disponibilité de l employé',
 })
 console.log('heure que vous avez choisi et hour marge de disponibilité de l employé')
 } else {
 var agendaDay = _.find(employer.agenda, function (d) {
 return d.day == day
 });

 var crenaux = _.filter(agendaDay.margetime, function (m) {
 h = m.content.split(' : ')
 houreAgenda = parseInt(h[0])
 minAgenda = parseInt(h[1])
 return houreAgenda >= houre && minAgenda >= minute && m.cause == "nothing"
 })

 Rendezvous.find({idemploye: idEmp}).exec(function (err, rendezvous) {
 _.each(crenaux, function (m) {
 _.each(rendezvous, function (rdvs) {
 console.log("rdv : ", moment(rdvs.date))
 if (moment(rdvs.date).format('YYYY/MM/DD/HH:mm') == moment(req.params.date).format('YYYY/MM/DD/HH:mm')) {
 console.log("already exist");
 var bad_resp = [{"msg": "Already reserved"}];
 result.push(bad_resp);
 }
 else {

 var good_resp = [{
 "houre": houreAgenda,
 "minute": minAgenda,
 "day": day,
 "month": month,
 " year": year
 }];
 result.push(good_resp);
 console.log('not exist')
 }
 })
 })
 });

 }

 });
 };
 */

// ***************************** RdV *****************************************
/**
 *
 * @param rdvs Rendezvous
 * @return {Array} {from:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, to:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, sizeInMinute: 0, cause: ''}
 */
function rdvToCrenaux(rdvs) {
    return _.map(rdvs, function (rdv) {
        var startDate = moment(rdv.date);
        startDate.locale('fr');
        startDate.set({'second': 0});

        var endDate = startDate.clone();
        endDate.add(rdv.time, 'm');
        endDate.locale('fr');
        endDate.set({'second': 59});


        return {
            from: {
                day: startDate.format('dddd'),
                datetime: startDate.toDate().getTime() / 1000,
                date: startDate.format("DD/MM/YYYY"),
                hour: startDate.format('HH'),
                minute: startDate.format('mm'),
            },
            to: {
                day: endDate.format("dddd"),
                datetime: endDate.toDate().getTime() / 1000,
                //     date: endDate.format(? ? ? ?),
                date: endDate.format("DD/MM/YYYY"),
                hour: endDate.format('HH'),
                minute: endDate.format('mm'),
            },
            sizeInMinute: rdv.time,
            cause: 'RDV'
        }
    });
}

/**
 *
 * @param indisps
 * @return {Array} {from:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, to:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, sizeInMinute: 0, cause: ''}
 */
function indispToCrenaux(indisps) {
    return _.map(indisps, function (indisp) {
        var date = moment(indisp.startTime);
        date.locale('fr');
        date.set({'second': 0});

        var endDate = moment(indisp.endTime);
        endDate.locale('fr');
        endDate.set({'second': 59});


        return {
            from: {
                day: date.format('dddd'),
                datetime: date.toDate().getTime() / 1000,
                date: date.format("DD/MM/YYYY"),
                hour: date.format('HH'),
                minute: date.format('mm'),
            },
            to: {
                day: endDate.format("dddd"),
                datetime: endDate.toDate().getTime() / 1000,
                date: endDate.format("DD/MM/YYYY"),
                hour: endDate.format('HH'),
                minute: endDate.format('mm'),
            },
            sizeInMinute: (indisp.endTime - indisp.startTime) / 60000,
            cause: indisp.cause
        }
    });
}

/**
 *
 * @param agenda Json from emp agend
 * @param dayName String
 */
function tournAgenda(agenda, dayName) {
    var minDateMomentDayIndex = _.findIndex(agenda, function (day) {
        return day.day == dayName;
    });
    if (minDateMomentDayIndex === 0) return agenda;
    return _.union(agenda.slice(minDateMomentDayIndex, agenda.length), agenda.slice(0, minDateMomentDayIndex))
}
/**
 *
 * @param empId
 * @param agenda Json from emp agend
 * @param minDate Date
 * @param weeksCount Integer
 * @return {Array} of {empId: '', from:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, to:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, sizeInMinute: 0, cause: ''}
 */
function generateEmpCalendarFrom(empId, agenda, minDate, weeksCount) {
    var minDate_ = new Date(minDate);
    var minDateMoment = moment(minDate_);
    minDateMoment.locale('fr');
    var firstDate = true;
    var minDateMomentDay = minDateMoment.format('dddd');
    var agenda_ = tournAgenda(agenda, minDateMomentDay);
    return _.chain(_.range(0, weeksCount))
        .map(function (c) {
            return _.map(agenda_, function (day) {
                obj = _.chain(day.margetime)
                    .map(function (m) {
                        var h = m.content.split(' : ');
                        var date = minDateMoment.clone(),
                            c_hour = parseInt(h[0]),
                            c_minute = parseInt(h[1]);
                        //Ignore time before minDate time
                        if (firstDate === true) {
                            if (c_hour < minDateMoment.hours() ||
                                (c_hour == minDateMoment.hours() && c_minute < minDateMoment.minutes()))
                                return undefined;
                        }

                        date.locale('fr');
                        date.set({'hour': c_hour, 'minute': c_minute, 'second': 0});
                        var endDate = date.clone();
                        endDate.locale('fr');
                        endDate.add(m.time, 'm');
                        endDate.set({'second': 59});


                        return {
                            empId: empId,
                            from: {
                                day: date.format('dddd'),
                                datetime: date.toDate().getTime() / 1000,
                                date: date.format("DD/MM/YYYY"),
                                hour: date.format('HH'),
                                minute: date.format('mm'),
                            },
                            to: {
                                day: endDate.format("dddd"),
                                datetime: endDate.toDate().getTime() / 1000,
                                date: endDate.format("DD/MM/YYYY"),
                                hour: endDate.format('HH'),
                                minute: endDate.format('mm'),
                            },
                            sizeInMinute: m.time,
                            cause: m.cause
                        }
                    })
                    .filter(function (c) {
                        return c !== undefined;
                    }).value();
                firstDate = false;
                //increment date
                minDateMoment = minDateMoment.clone().add(1, 'd');
                return obj;
            });
        }).flatten()
        .value();
}
/**
 *
 * @param minDate Date
 * @param empId
 * @param weeksCount Integer
 * @return Promise
 */
function findAvailableCreanauxByEmlp(minDate, empId, weeksCount) {

   /* console.log(minDate)
    console.log(empId)
    console.log(weeksCount)
    console.log("-----------------------")*/

    var empPromise = Employer.findOne({_id: empId});
    var rdvPromise = Rendezvous.find({idemploye: empId, date: {$gte: minDate}});
    var indispPromise = Indispo.find({idemploye: empId, startTime: {$gte: minDate}});

    return Promise.all([empPromise, rdvPromise, indispPromise]).then(values => {
        //{empId: '',from:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, to:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, sizeInMinute: 0, cause: ''}
        var emp = values[0];
        var rdvs = values[1];
        var indisps = values[2];




        var rdvCrenaux = rdvToCrenaux(rdvs);
        var indisCrenaux = indispToCrenaux(indisps);
        var empCrenaux = generateEmpCalendarFrom(empId, emp.agenda, minDate, weeksCount);


        var crenauxOccupes = _.union(rdvCrenaux, indisCrenaux);

        var empCreWithOutRepos = _.filter(empCrenaux, function (c) {
            return c.cause == 'nothing';
        });

console.log(empCreWithOutRepos)
        var result = _.filter(empCreWithOutRepos, function (c1) {
            return undefined === _.find(crenauxOccupes, function (c2) {
                    return c1.to.datetime <= c2.from.datetime || c2.to.datetime <= c1.from.datetime;
                });
        });

        return empCreWithOutRepos;
    });
}


exports.findRdv = function (req, res) {



    var reqdate = new Date(req.params.date).getTime();
    var nowdate = new Date().getTime();

    if (reqdate < nowdate) {
        reqdate = nowdate;
    }



    var requestedEmpId = req.params.idemp;
    var requestedDate = moment(reqdate);//min date
    var requestedServiceId = '5931827befa50b137477a136';

    requestedDate.locale('fr');

    var availbaleCrenauxPromise = findAvailableCreanauxByEmlp(requestedDate.toDate(), requestedEmpId, 1);
    var servPromise = Service.findOne({_id: requestedServiceId});


    Promise.all([availbaleCrenauxPromise, servPromise])
        .then(values => {
            // array of {from:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, to:{day: '', datetime: 'js Date', date: 'YYYY-MM-DD', hour: '', minute: ''}, sizeInMinute: 0, cause: ''}
            var crenaux = values[0];
            var service = values[1];

            //if (!service)
            //  throw 'Service not found';

            //1. Filter only crenaux with duree >= service.time
         /*   var crenauxAvailable = _.filter(crenaux, function (c) {
                return true;//c.sizeInMinute >= service.time
            });*/
            //2. Get the nearest crenaux (using sort by date asc)
            var sortCrenaux = _.sortBy(crenaux, function (c) {
                return c.from.datetime;
            });

            var ferstcrenau=  _.first(sortCrenaux)

            var resultatcrenaux = _.filter(sortCrenaux, function (c) {
                return  c.from.date == ferstcrenau.from.date;;
            });

         //   console.log("resultatcrenaux ",crenaux)
            // console.log("ferstcrenau ",ferstcrenau)

            res.jsonp({
                data: {
                    //rdvs: [crenaux],
                    rdvs: [resultatcrenaux],
                    errors: []
                }
            })
        })
        .catch(reject => {
            res.jsonp({
                data: {
                    rdvs: [],
                    errors: [reject]
                }
            })
        });


}

//***************************End rdv *******************************************


// search rendezvous
exports.search = function (req, res) {
    Rendezvous.find({firstname: {'$regex': req.params.q}, idresponsable: req.params.idr}, function (err, rendezvous) {
        res.jsonp(rendezvous);
    });
};


// get rendezvous by id
exports.show = function (req, res) {
    Rendezvous.load(req.params.rendezvousId, function (err, rendezvous) {
        res.jsonp(rendezvous);
    });
};


// edit rendezvous
exports.put = function (req, res) {
    Rendezvous.load(req.params.rendezvousId, function (err, rendezvous) {

        rendezvous = _.extend(rendezvous, req.body);

        rendezvous.save(function (err) {
            res.jsonp(rendezvous);
        });
    });
};

// edit rendezvous
exports.confirmrdv = function (req, res) {
    Rendezvous.load(req.params.rendezvousId, function (err, rendezvous) {

        rendezvous.confirm=true;
        //rendezvous = _.extend(rendezvous, req.body);

        rendezvous.save(function (err) {
            res.jsonp(rendezvous);
        });
    });
};

// delete rendezvous
exports.delete = function (req, res) {
    Rendezvous.load(req.params.rdvId, function (err, rendezvous) {
        rendezvous.remove(function (err) {
            res.jsonp(rendezvous);
        });
    });
};
//  Inject modules
require('../models/rendezvous');
require('../models/employers');
require('../models/servicesalons');

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var _ = require('underscore');
var moment = require('moment');
var Rendezvous = mongoose.model("Rendezvous");
var Employer = mongoose.model("Employer");
var Service = mongoose.model("Servicesalon");


// save rendezvous
exports.post = function (req, res) {
    var rendezvous = new Rendezvous(req.body);
    rendezvous.save();
    res.jsonp(rendezvous);
};


// get rendezvous
exports.get = function (req, res) {
    var rdv= Rendezvous.find()
    console.log(rdv)
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

            /*  if(_.isEmpty(employer)){
             res.jsonp({
             'null':'No employee was registered by this identifier'
             });
             }else{*/
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

// ***************************** RdV *****************************************
/**
 *
 * @param rdvs Rendezvous
 * @return {Array}
 */
function rdvToCrenaux(rdvs) {
    return _.map(rdvs, function (rdv) {
        //TODO

        return {
            day: '',
            date: rdv.date,
            hour: '',
            minute: '',
            sizeInMinute: rdv.time,
            cause: 'RDV'
        }
    });
}

/**
 *
 * @param indisps
 * @return {Array}
 */
function indispToCrenaux(indisps) {
    return _.map(rdvs, function (indisps) {
        return {
            day: '',
            date: '',
            hour: '',
            minute: '',
            sizeInMinute: 0,
            cause: ''
        }
    });
}

/**
 *
 * @param agenda Json from emp agend
 * @param dayName String
 */
function tournAgenda(agenda, dayName){
    var minDateMomentDayIndex = _.findIndex(agenda, function(day){
        return day.day == dayName;
    });

    if(minDateMomentDayIndex === 0) return agenda;

    return _.union(agenda.slice(minDateMomentDayIndex, agenda.length - 1), agenda.slice(0, minDateMomentDayIndex - 1))
}
/**
 *
 * @param agenda Json from emp agend
 * @param minDate Date
 * @param weeksCount Integer
 * @return {Array} of {day: '', date: 'js Date', hour: '', minute: '', sizeInMinute: 0, cause: ''}
 */
function generateEmpCalendarFrom(agenda, minDate, weeksCount){
    var minDate_ = minDate.clone();
    var minDateMoment = moment(minDate_);
    var minDateMomentDay = minDateMoment.format('dddd');
    var agenda_ = tournAgenda(agenda, minDateMomentDay);

    return _.map(_.range(0, weeksCount), function (c) {
        return _.chain(agenda_)
            .map(function (day) {
                obj = _.map(day.margetime, function(m){
                    var h = m.content.split(' : ');
                    return {
                        day: day.day,//day name Lundi, Mardi
                        date: minDateMoment.toDate(),
                        hour: parseInt(h[0]),
                        minute: parseInt(h[1]),
                        sizeInMinute: m.time,
                        cause: m.cause
                    }
                });
                //increment date
                minDateMoment.add(1, 'd');
                return obj;

            });
    });
}
/**
 *
 * @param minDate Date
 * @param empId
 * @param weeksCount Integer
 * @return Promise
 */
function findAvailableCreanaux(minDate, empId, weeksCount) {
    var empPromise = Employer.findOne({_id: empId});
    var rdvPromise = Rendezvous.find({idemploye: empId, date: {$ge: minDate}});
    var indispPromise = [];

    return Promise.all([empPromise, rdvPromise, indispPromise]).then(values => {
        //{day: '', date: 'js Date', hour: '', minute: '', sizeInMinute: 0, cause: ''}
        var emp = values[0];
        var rdvs = values[1];
        var indisps = values[2];

        var rdvCrenaux = rdvToCrenaux(rdvs);
        var indisCrenaux = indispToCrenaux(indisps);
        var empCrenaux = generateEmpCalendarFrom(emp.agenda, minDate, weeksCount);

        var crenauxOccupes = _.union(rdvs, indisps);
        return _.filter(empCrenaux, function (c) {
            return _.some(crenauxOccupes, function() {
                return false;//TODO
            });
        });
    });
}

exports.findRdv = function (req, res) {
    var requestedEmpId = '59006181fa528b0bb8874878';
    var requestedDate = moment(req.params.date);//min date
    var requestedServiceId = '';

    requestedDate.locale('fr');

    var rdvs = Rendezvous.find({idemploye: requestedEmpId, date: {$gte : requestedDate.toDate()}})
    console.log('////////////////////////////////////////////////')
    rdvToCrenaux(rdvs)
   // res.jsonp(rdvs)
    //console.log(JSON.stringify(rdvs))
    console.log(rdvs)
  //  var availbaleCrenauxPromise = findAvailableCreanaux(requestedDate.toDate(), requestedEmpId, 24);
    console.log('////////////////////////////////////////////////')


/*
    var servPromise = Service.findOne({_id: requestedServiceId});
    Promise.all(availbaleCrenauxPromise, servPromise)
        .then(values => {
            // array of {day: '', date: 'js Date', hour: '', minute: '', sizeInMinute: 0, cause: ''}
            var crenaux = values[0];
            //TODO
            //1. Filter only crenaux with duree >= service.time
            //2. Get the nearest crenaux (using sort by date asc)
            res.jsonp({
                rdv: _.first(crenaux)
            })
        })
        .catch(reject => {
            res.jsonp({
                msg: reject
            })
        });
*/

}

//***************************End rdv *******************************************


// search rendezvous
exports.search = function (req, res) {
    Rendezvous.find({name: {'$regex': req.params.q}}, function (err, rendezvous) {
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

// delete rendezvous
exports.delete = function (req, res) {
    Rendezvous.load(req.params.rendezvousId, function (err, rendezvous) {
        rendezvous.remove(function (err) {
            res.jsonp(rendezvous);
        });
    });
};

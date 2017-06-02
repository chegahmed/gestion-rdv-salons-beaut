/**
 * Created by ahmed on 25/05/2017.
 */


var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


var salonCtr = require('../controllers/salonController')
var servicesalonCtr = require('../controllers/servicesalonController')
var clientCtr = require('../controllers/clientController');
var rdvCtr = require('../controllers/rendezvousController');
var indispCtr = require('../controllers/indisponibliteController');






///////////////////////here route Indisonibilite   ///////////////

/* POST /rdv  */
router.post('/indisponible',indispCtr.post);

// GET /indisponible
router.get('/indisponible',indispCtr.get);

// GET indisponible/fjaslfj478329fsafashf2
router.get('/indisponible/:salonId',indispCtr.show);

// PUT indisponible/fjaslfj478329fsafashf2
router.put('/indisponible/:salonId',indispCtr.put);

// DELETE indisponible/fjaslfj478329fsafashf2
router.delete('/indisponible/:salonId',indispCtr.delete);

/// get
router.get('/indisponiblesearch/:q',indispCtr.search);



//////////////////////////here route RDV   //////////////////////

/* POST /rdv  */
router.post('/rdv',rdvCtr.post);

router.get('/chercherrdv/:date',rdvCtr.ChercherRDV);

router.get('/findrdv/:date',rdvCtr.findRdv);

// GET /rdv
router.get('/rdv',rdvCtr.get);

// GET rdv/fjaslfj478329fsafashf2
router.get('/rdv/:rendezvousId',rdvCtr.show);

// PUT rdv/fjaslfj478329fsafashf2
router.put('/rdv/:rendezvousId',rdvCtr.put);

// DELETE rdv/fjaslfj478329fsafashf2
router.delete('/rdv/:rendezvousId',rdvCtr.delete);

/// get
router.get('/rdvsearch/:q',rdvCtr.search);






//////////////////////

//send email to client and register data in doc temporary-client
router.post('/registerclient', clientCtr.post);

//after verification email client has been register in doc real-client
router.get('/email-verification/:URL', clientCtr.get);



// GET /salon
router.get('/rdvsalon/:ville',salonCtr.getSalonByVille);

//get service salon by id salon
router.get('/rdvservice/:idsalon',servicesalonCtr.getServicesalonByidsalon);

//get category and sub-category by idsalon
router.get('/rdvcatg/:idsalon',servicesalonCtr.getCategorieByidsalonandsalonservice);





module.exports = router;
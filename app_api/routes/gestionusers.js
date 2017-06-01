var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});




var gestionuser = require('../controllers/gestionuser')
var villeCtr = require('../controllers/villeController')
var categorieCtr = require('../controllers/categoriecontroller')
var serviceCtr = require('../controllers/serviceController')
var salonCtr = require('../controllers/salonController')
var serviceproposerCtr = require('../controllers/serviceproposerController')
var employeCtr = require('../controllers/employeController')
var servicesalonCtr = require('../controllers/servicesalonController')







//////////////////////ici Route employe /////////////////

/* POST /employe  */
router.post('/employer',employeCtr.post);

// GET /employer
router.get('/employer',employeCtr.get);

//GET /getAllMyEmploye
router.get('/allemployer/:responsableId',employeCtr.getAllMyEmploye);

// GET employer/fjaslfj478329fsafashf2
router.get('/employer/:employerId',employeCtr.show);

// PUT employer/fjaslfj478329fsafashf2
router.put('/employer/:employerId',employeCtr.put);

// DELETE employer/fjaslfj478329fsafashf2
router.delete('/employer/:employerId',employeCtr.delete);

router.get('/employersearch/:idr/:q',employeCtr.search);

////////////agenda exist in model employe//////

router.get('/agendaemploye/:employerId/:subid/:subsubid',employeCtr.showsub);

router.put('/agendaemploye/:employerId/:subid/:subsubid',employeCtr.putsub);



//////////////////////ici Route proposer  Service /////////////////

/* POST /service  */
router.post('/servicepropose',serviceproposerCtr.post);

// GET /souservicepropose
router.get('/servicepropose',serviceproposerCtr.get);

// GET servicepropose/fjaslfj478329fsafashf2
router.get('/servicepropose/:serviceproposeId',serviceproposerCtr.show);

// PUT souservicepropose/fjaslfj478329fsafashf2
router.put('/servicepropose/:serviceproposeId',serviceproposerCtr.put);

// DELETE souservicepropose/fjaslfj478329fsafashf2
router.delete('/servicepropose/:serviceproposeId',serviceproposerCtr.delete);

router.get('/serviceproposesearch/:q',serviceproposerCtr.search);

//////////////////////ici Route salon Service /////////////////

/* POST /service  */
router.post('/servicesalon',servicesalonCtr.post);

// GET /servicesalon
router.get('/servicesalon',servicesalonCtr.get);

// GET servicesalon/fjaslfj478329fsafashf2
router.get('/servicesalon/:servicesalonId',servicesalonCtr.show);


//get by name service and id salon
router.get('/servicesalonbyidsalon/:q/:p',servicesalonCtr.VerifierExistanceSalon);


// PUT servicesalon/fjaslfj478329fsafashf2
router.put('/servicesalon/:servicesalonId',servicesalonCtr.put);

// DELETE servicesalon/fjaslfj478329fsafashf2
router.delete('/servicesalon/:servicesalonId',servicesalonCtr.delete);

router.get('/servicesalonsearch/:q',servicesalonCtr.search);
//////////////ici route profile salon///////////////////

router.get('/getallmysalon/:userId',salonCtr.getAllMySallon);

//GET all salons by user
router.get('/getallsalonbyuser/:userId',salonCtr.getAllSallonByUser);

//////////////////////ici Route Salon /////////////////

/* POST /salon  */
router.post('/salon',salonCtr.post);

// GET /salon
router.get('/salon',salonCtr.get);


// GET salon/fjaslfj478329fsafashf2
router.get('/salon/:salonId',salonCtr.show);

// PUT salon/fjaslfj478329fsafashf2
router.put('/salon/:salonId',salonCtr.put);

// DELETE salon/fjaslfj478329fsafashf2
router.delete('/salon/:salonId',salonCtr.delete);

/// get
router.get('/salonsearch/:q',salonCtr.search);

//////////////////////ici Route Sous Service /////////////////

/* POST /service  */
router.post('/service',serviceCtr.post);

// GET /souservice
router.get('/service',serviceCtr.get);

// GET service/fjaslfj478329fsafashf2
router.get('/service/:serviceId',serviceCtr.show);

// PUT souservice/fjaslfj478329fsafashf2
router.put('/service/:serviceId',serviceCtr.put);

// DELETE souservice/fjaslfj478329fsafashf2
router.delete('/service/:serviceId',serviceCtr.delete);

router.get('/servicesearch/:q',serviceCtr.search);
//////////////////////ici Route Categorie /////////////////

/* POST /categorie  */
router.post('/categorie',categorieCtr.post);

// GET /categorie
router.get('/categorie',categorieCtr.getCategorie);

// GET categorie/fjaslfj478329fsafashf2
router.get('/categoriesearch/:q',categorieCtr.search);

// GET categorie/fjaslfj478329fsafashf2
router.get('/categorie/:categorieId',categorieCtr.show);

// PUT categorie/fjaslfj478329fsafashf2
router.put('/categorie/:categorieId',categorieCtr.put);

// PUT categorie/fjaslfj478329fsafashf2
router.put('/categoriepm/:categorieId',categorieCtr.putcatgwithimg);


// DELETE categorie/fjaslfj478329fsafashf2
router.delete('/categorie/:categorieId',categorieCtr.delete);


// GET getAll catg and scatg
router.get('/categandscatg',categorieCtr.getAll);



/*******pour sous categorie ******/
// GET /souscategorie
router.get('/souscategorie',categorieCtr.getSousCategorie);

// GET souscategoriesearch/fjaslfj478329fsafashf2
router.get('/souscategoriesearch/:q',categorieCtr.searchscatg);

//////////////////////ici Route Ville /////////////////

/* POST /ville  */
router.post('/ville',villeCtr.post);

// GET /ville
router.get('/ville',villeCtr.get);

// GET ville/fjaslfj478329fsafashf2
router.get('/ville/:villeId',villeCtr.show);

// PUT ville/fjaslfj478329fsafashf2
router.put('/ville/:villeId',villeCtr.put);

// DELETE ville/fjaslfj478329fsafashf2
router.delete('/ville/:villeId',villeCtr.delete);

router.get('/villesearch/:q',villeCtr.search);

//////////////////////ici Route USERS /////////////////

/* POST /user  */
router.post('/',gestionuser.post);

// GET /user
router.get('/',gestionuser.get);



// GET user/fjaslfj478329fsafashf2
router.get('/:userId',gestionuser.show);

// PUT user/fjaslfj478329fsafashf2
router.put('/:userId',gestionuser.put);

// DELETE user/fjaslfj478329fsafashf2
router.delete('/:userId',gestionuser.delete);

/// get
router.get('/usersearch/:q',gestionuser.search);


module.exports = router;
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});




var gestionuser = require('./gestionuser')
var villeCtr = require('./villeController')
var categorieCtr = require('./categoriecontroller')
var sserviceCtr = require('./sservicecontroller')
var salonCtr = require('./salonController')





//////////////////////ici Route Salon /////////////////

/* POST /user  */
router.post('/salon',salonCtr.post);

// GET /user
router.get('/salon',salonCtr.get);

// GET user/fjaslfj478329fsafashf2
router.get('/salon/:salonId',salonCtr.show);

// PUT user/fjaslfj478329fsafashf2
router.put('/salon/:salonId',salonCtr.put);

// DELETE user/fjaslfj478329fsafashf2
router.delete('/salon/:salonId',salonCtr.delete);

/// get
router.get('/salonsearch/:q',salonCtr.search);

//////////////////////ici Route Sous Service /////////////////

/* POST /sservice  */
router.post('/sservice',sserviceCtr.post);

// GET /sousservice
router.get('/sservice',sserviceCtr.get);

// GET service/fjaslfj478329fsafashf2
router.get('/sservice/:sserviceId',sserviceCtr.show);

// PUT sousservice/fjaslfj478329fsafashf2
router.put('/sservice/:sserviceId',sserviceCtr.put);

// DELETE sousservice/fjaslfj478329fsafashf2
router.delete('/sservice/:sserviceId',sserviceCtr.delete);

router.get('/sservicesearch/:q',sserviceCtr.search);
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
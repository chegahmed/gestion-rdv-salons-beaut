var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var gestionuser = require('../controllers/gestionuser')
var villeCtr = require('../controllers/villecontroller')
var serviceCtr = require('../controllers/servicecontroller')
var sserviceCtr = require('../controllers/sservicecontroller')
var testCtr = require('../controllers/testcontroller')




//router.get('/test',testCtr.get);

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
//////////////////////ici Route Service /////////////////

/* POST /ville  */
router.post('/service',serviceCtr.post);

// GET /service
router.get('/service',serviceCtr.get);

// GET service/fjaslfj478329fsafashf2
router.get('/service/:serviceId',serviceCtr.show);

// PUT service/fjaslfj478329fsafashf2
router.put('/service/:serviceId',serviceCtr.put);

// DELETE service/fjaslfj478329fsafashf2
router.delete('/service/:serviceId',serviceCtr.delete);

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





module.exports = router;
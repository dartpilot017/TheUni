const express = require("express");
const router = express.Router();


router.get('/', (req, res, next) => {
        res.render('home');
    });
router.get('/units', (req, res, next) => {
        
        res.render('units_page');
        
    });
router.get('/registry', (req, res, next) => {
        
        res.render('registry');
        
    });
router.get('/sport', (req, res, next) => {
        
        res.render('sport');
        
    });

    router.get('/nuga', (req, res, next) => {
        
        res.render('nuga');
        
    });
router.get('/staff', (req, res, next) => {
        
        res.render('staff');
        
    });
router.get('/officials', (req, res, next) => {
        
        res.render('official');
        
    });
router.get('/pgs', (req, res, next) => {

        res.render('PG_School');
});
router.get('/zoo', (req, res, next) => {

        res.render('zoo');
});
router.get('/bursary', (req, res, next) => {

    res.render('bursary');
});
router.get('/ear', (req, res, next) => {

    res.render('Exam_Records');
});
router.get('/sta', (req, res, next) => {

    res.render('Student_Affiars');
});
router.get('/nymu', (req, res, next) => {

    res.render('NYSC_Mob');
});
router.get('/str', (req, res, next) => {

    res.render('Student_Rec');
});
router.get('/pnuga', (req, res, next) => {

    res.render('Pre_NUGA');
});
router.get('/wam', (req, res, next) => {

    res.render('Works_Maintenance');
});


// router.get('/recommended', function (req, res) {
//     //do something
//     res.jsonp({success : true})
// })


    module.exports = router;
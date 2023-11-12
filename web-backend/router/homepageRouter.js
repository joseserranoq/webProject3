const { Router } = require('express');
const router = Router();

const { homepageGet } = require('../controllers/homepage');

//homepage routes
router.get('/algo',homepageGet);

module.exports = router;
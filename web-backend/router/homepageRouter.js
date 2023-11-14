const { Router } = require('express');
const router = Router();

const { homepageGet } = require('../controllers/homepage');

//homepage routes
router.get('/api',homepageGet);

module.exports = router;
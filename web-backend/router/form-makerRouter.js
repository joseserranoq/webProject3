const { Router } = require('express');
const router = Router();


const { formMakerGet,formMakerPost } = require('../controllers/form-maker');



//form-maker routes
router.get('/api',formMakerGet);
router.post('/api',formMakerPost);
module.exports = router;
const { Router } = require('express');
const router = Router();

const { loginGet,loginPost } = require('../controllers/login');

//homepage routes
router.get('/api',loginGet);
router.post('/api',loginPost);
module.exports = router;
const express = require('express');
const {AdminAuth} = require('../Controllers/AdminController');

const router = express.Router();


//admin login
router.route('/adminlogin').post(AdminAuth);




module.exports = router;
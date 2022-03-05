const express = require('express');
const { registerUser , AuthUser , ReadData, getUser , updateUser , deleteuser , AllUsers , SearchUser} = require('../Controllers/userControllers');

const router = express.Router();


// Signup Route
router.route('/signup').post(registerUser)

// Login Route  
router.route('/login').post(AuthUser)


//reading user data
router.route('/read').get(ReadData)

//getuser  data
router.route('/getUser/:id').get(getUser)

//update user data
router.route('/update/:id').patch(updateUser)

//delete user
router.route('/delete/:id').delete(deleteuser)


//search user
router.route('/search').get(AllUsers).post(SearchUser)

module.exports = router;
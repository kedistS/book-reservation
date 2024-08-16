const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);

module.exports = router;
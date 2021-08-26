const passport = require('passport')
const auth = require('../controllers/authController');
var router = require("express").Router();

router.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile','email'] }))
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }), 
    auth.googleAuthJWT
  )

module.exports = router;
const { ensureAuth, ensureGuest } = require('../middlewares/googleAuth')
const passport = require('passport')
const auth = require('../controllers/authController');
var router = require("express").Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log(res)
      res.send({
          message: "Success"
      })
    }
  )

module.exports = router;
// taken from https://dev.to/atultyagi612/google-authentication-in-nodejs-1f1d

const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require("../models");
const User = db.users;
const Farm = db.farm;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/growcery/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        var name = "user" + Math.random().toString(36).substring(2,15) 
        const newUser = {
          googleId: profile.id,
          username: name,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value
        }

        try {
        var user = await User.findOne({where: {googleId: profile.id}})
          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            const farmName = newUser.username + `'s farm`
            const farmData = {
                user_id: user.id,
                farm_name: farmName
            }
            farm = await Farm.create(farmData)
            
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
} 
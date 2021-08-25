// taken from https://dev.to/atultyagi612/google-authentication-in-nodejs-1f1d

const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require("../models");
const User = db.users;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/growcery/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value
        }

        try {
        var user = await User.findOne({where: {googleId: profile.id}})

          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
} 
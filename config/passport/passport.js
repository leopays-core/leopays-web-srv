const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const User = mongoose.model('User');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  //User.findOne({ username: username })
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });//'Incorrect username.' 'Incorrect password.'
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });//'Incorrect username.' 'Incorrect password.'
      }

      return done(null, user);
    }).catch(done);
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findById(user.id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;

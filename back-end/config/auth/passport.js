const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User'); 

passport.use(new LocalStrategy(
  {
    usernameField: 'useremail',
    passwordField: 'password'
  },
  async function(useremail, password, done) {
    try {
      const user = await User.findOne({ useremail: useremail });
      if (!user) {
        return done(null, false, { message: 'Người dùng không tồn tại.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Mật khẩu không chính xác.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

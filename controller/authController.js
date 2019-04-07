const passport = require('passport');


exports.login = (req, res, next) => {
 passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).send();
    }
    if (!user && info) {
      return res.status(422).send(info);
    }
    req.user = user;
    next();
    // do something here and send back a res.json()
  })(req, res, next);
}
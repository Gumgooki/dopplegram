const passport = require("passport");
const { User } = require("../db/models/");
const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//hacky way to get around this
let callbackURL = process.env.HOME_URL + "/auth/google/callback";

// if (process.env.HOME_URL === "https://desolate-dusk-97411.herokuapp.com") {
//   callbackURL =
//     "https://desolate-dusk-97411.herokuapp.com/auth/google/callback";
// }

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: process.env.GOOGLE_CALLBACK
  // callbackURL: callbackURL,
  callbackURL: callbackURL,
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (
  token,
  refreshToken,
  profile,
  done
) {
  const googleId = profile.id;
  const email = profile.emails[0].value;
  const userName = email.slice(0, email.length - 10);

  User.findOne({ where: { googleId: googleId } })
    .then(function (user) {
      if (!user) {
        return User.create({ userName, email, googleId }).then(function (user) {
          done(null, user);
        });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

passport.use(strategy);

//once we make an auth folder we should correct this
router.get("/", passport.authenticate("google", { scope: "email" }));

//same with this
router.get(
  "/callback",
  passport.authenticate("google", {
    prompt: "select_account",
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

module.exports = router;

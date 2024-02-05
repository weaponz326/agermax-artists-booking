const passport = require("passport");
const User = require("../models/User");

const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"], // Adjust according to the data you need
    },
    async (accessToken, refreshToken, profile, cb) => {
      // Find or create user in your database
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email,
          facebookId: profile.id,
          isOAuth: true, 
          role: "artist",
          // Set other fields as necessary
        });
        await user.save();
      }

      return cb(null, user);
    }
  )
);

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      // Find or create user in your database
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email,
          oauthId: profile.id, 
          isOAuth: true, 
          role: "artist",
        });
        await user.save();
      }

      return cb(null, user);
    }
  )
);

const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true, // To include the email in the profile, if available
    },
    async (token, tokenSecret, profile, cb) => {
      // Find or create user in your database
      const email = profile.emails ? profile.emails[0].value : null;
      let user = await User.findOne({ email: email });

      if (!user) {
        user = new User({
          firstName: profile.displayName, // Twitter does not provide separate first and last names
          lastName: "", // You might not get this from Twitter
          email,
          oauthId: profile.id, 
          isOAuth: true, 
          role: "artist",
        });
        await user.save();
      }

      return cb(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

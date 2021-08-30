const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const db = require('../models')
const User = db.sequelize.models.User



passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
    User.findOne({where: { googleId }})
    .then((user) => {
        done(null, user);
    })
    .catch(err=>{return res.status(500).send(err)});
});


passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.create({ googleId: profile.id, username: profile.displayName })
            .then(cUser => done(null, cUser))
            .catch(err=>{return console.log(err)});
    })
);

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({where: {googleId: profile.id}}).then((currentUser) => {
            if(currentUser){
                console.log(profile);
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                User.create({ googleId: profile.id, username: profile.displayName })
                    .then(newUser => done(null, newUser))
                    .catch(err=>{return console.log(err)});
            }
        });
    })
);
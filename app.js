
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , config = process.env
//  , config = require('./config')
  , db = require("mongojs")(config.MONGO_URL, ["user"]);

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;



//Passport config

passport.use(new GoogleStrategy({
    returnURL: config.BASE_URL + '/auth/google/return',
    realm: config.BASE_URL
  },
  function(identifier, profile, done) {
    if(config.RESTRICT_DOMAIN !== undefined) {
        var validDomain = false;
        var regex = new RegExp("@" + config.RESTRICT_DOMAIN + "$", "ig");
        for(var i=0;i<profile.emails.length;i++) {
            if(regex.test(profile.emails[i].value)) {
                validDomain = true;
                break;
            }
        }

        if(!validDomain) {
            done("Invalid domain", null);
            return false;
        }
    }

    db.user.findAndModify({
            query: {openId: identifier},
            update: {$set: {openID: identifier, profile: profile }},
            new: true,
            upsert: true
        }, function(err, user) {
            done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.openID);
});

passport.deserializeUser(function(id, done) {
  db.user.findOne({openID: id}, function (err, user) {
    done(err, user);
  });
});



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/dashboard', user.dashboard(config.KEENIO));



//Passport
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/dashboard',
                                    failureRedirect: '/' }));
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



//Start server
http.createServer(app).listen(app.get('port') || process.env.port || 8080, function(){
  console.log('Express server listening on port ' + app.get('port') || process.env.port || 8080);
});

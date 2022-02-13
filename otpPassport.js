const otpModel = require("./models/otp");
var LocalStrategy = require("passport-local").Strategy
const session = require('express-session');  // session middleware
const MongoStore = require("connect-mongo");
const passport = require('passport');  // authentication
var otpRouter = require("./routes/otpRoute");


const app = require("./app");
const cookieParser = require("cookie-parser");


app.use("/otp", otpRouter);

app.use(cookieParser());

// set up sessions

const oneDay = 1000 * 60 * 60 * 24;  //1hr

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    store: MongoStore.create({ mongoUrl: "mongodb+srv://beastkun:beastkun@cluster0.vgnsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}),
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use('otp-local', new LocalStrategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password' // this is the virtual field on the model
//   },
//   (email, password, done) => 
//   {
//     otpModel.findOne(
//       {
//       email: email
//     }).then(user=>
//     {
//       if (!user) {
//         return done(null, false, { message: 'error: incorrect email'}) ;
//       }

//       //Match Passwords
//       bcrypt.compare(password, user.password, (err, isMatch) => 
//       {
//         if (err) throw err;
//         if (isMatch) {
//             return done(null, user);
//         } else {
//             return done(null, false, { message: 'Password incorrect' });
//         }
//       });
//     })
//     .catch(err => console.log(err));
//   }
// ));


  // }
  //     ) function(err, user) {
  //     if (err) return done(err);

  //     if (!user) {
  //       return done(null, false, {
  //         message: 'This email is not registered.'
  //       });
  //     }
  //     if (!user.authenticate(password)) {
  //       return done(null, false, {
  //         message: 'This password is not correct.'
  //       });
  //     }
  //     return done(null, user);
  //   });
  // }



// passport.serializeUser(otpModel.serializeUser()
// );

// passport.deserializeUser(otpModel.deserializeUser());
const otpModel = require("./models/otp");

const session = require('express-session');  // session middleware
const MongoStore = require("connect-mongo");

var otpRouter = require("./routes/otpRoute");





// set up sessions

  //1hr



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
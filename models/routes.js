module.exports = function (app, passport, db, ObjectId) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  // app.get('/', function (req, res) {
  //   res.render('index.html');
  // });

  //  SECTION =========================
  app.get('/', function (req, res) {
    db.collection('main').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {
        user: req.user,
        main: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // POSTroutes ===============================================================
  //refer to https://gist.github.com/rayterrill/8ca484fe0e6ecf820b51eebd766ceae8
  //===============================================================================
  app.post('/main', (req, res) => {
    console.log(req.body)
    db.collection('main').save({
      eventtitle: req.body.eventtitle,
      eventlocation: req.body.eventlocation,
      eventdate: req.body.eventdate,
      eventdescription: req.body.eventdescription,
      eventcapacity: req.body.eventcapacity
      // eventimg: 0
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  })

  // thumbup ==============================
  app.put('/main', (req, res) => {
    db.collection('main')
      .findOneAndUpdate({
        _id: ObjectId(req.body._id)
      }, {
        $set: {
          eventtitle: req.body.eventtitle,
          eventlocation: req.body.eventlocation,
          eventdate: req.body.eventdate,
          eventdescription: req.body.eventdescription,
          eventcapacity: req.body.eventcapacity
        }

      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return console.log(err)
        console.log(result)
        res.send(result)
      })
  })

  // app.post('/upload', (req, res) => {
  //   db.collection('main').save({
  //     eventtitle: req.body.eventtitle,
  //     eventlocation: req.body.eventlocation,
  //     eventdate: req.body.eventdate,
  //     eventdescription: req.body.eventdescription,
  //     eventcapacity: req.body.eventcapacity
  //     // eventimg: 0
  //   }, (err, result) => {
  //     if (err) return console.log(err)
  //     console.log('saved to database')
  //     res.redirect('/')
  //   })
  // })



  app.delete('/main', (req, res) => {
    db.collection('main').findOneAndDelete({ _id: ObjectId(req.body._id) }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })
  //==============================================================================
  // =============================================================================


  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure  section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash main
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure  section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash main
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

const router = require('express').Router();
const {User} = require('../db/models')


router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

router.put('/change', (req, res, next) => {
  User.update({
    email: req.body.credentials.email,
    password: req.body.credentials.password,
    userName: req.body.credentials.userName
  },
  {
    where: {id: req.body.user.id}
  }).then(
    res.status(201)
  )
})

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use('/google', require('./google'))

module.exports = router;

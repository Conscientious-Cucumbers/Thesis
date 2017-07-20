const express = require('express');
const router = express.Router();
const Queries = require('../controllers').Queries;
const ProfileController = require('../controllers').Profiles;


//GET

router.route('/info')
  .get((req, res) => {
    req.user.username = req.user.email.split('@')[0];
    res.send(req.user);
  });

///////////// GET //////////////

router.route('/:username/info')
  .get(ProfileController.getInfo);

router.route('/:username/newslike')
  .get(Queries.getNewsLike);

router.route('/:username/statuslike')
  .get(Queries.getStatusesLike);

router.route('/:username/status')
  .get(Queries.getStatuses);


///////////  POST  ////////////

router.route('/status/like')
  .post(Queries.addStatusLiked);


router.route('/news/like')
  .post(Queries.addNewsLiked);


router.route('/status')
  .post(Queries.createStatus);


router.route('/info')
  .post(ProfileController.updateInfo);


router.route('/follow')
  .post(Queries.follow);



module.exports = router;





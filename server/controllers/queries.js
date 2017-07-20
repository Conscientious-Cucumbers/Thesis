const models = require('../../db/models');



//////////// POST ///////////////

module.exports.addNewsLiked = (req, res) => {
  console.log("******** addNewsLiked request body: ", req.body);
  console.log('Logged in user: ', req.user);
  models.NewsItem.forge({ 
      source: req.body.newsLike.source, 
      title: req.body.newsLike.title,
      thumbnail: req.body.newsLike.thumbnail,
      text: req.body.newsLike.text,
      media: req.body.newsLike.media,
      date: req.body.newsLike.date
    })
    .save()
    .then(result => {

      models.NewsLike.forge({
        id_user: req.user.id,
        id_news: result.attributes.id
      })
      .save()
      .then(() => res.status(201).send('Saved News Liked'));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};



module.exports.addStatusLiked = (req, res) => {
  console.log("******** addStatusLiked request body: ", req.body);

  models.StatusLike.forge({ 
      id_status: req.body.id_status, 
      id_user: req.user.id
    })
    .save()
    .then(() => res.status(201).send('Saved Status Liked'))
    .catch(err => {
      res.status(500).send(err);
    });
};


module.exports.createStatus = (req, res) => {
  models.Status.forge({ 
      text: req.body.text, 
      id_user: req.user.id
    })
    .save()
    .then(() => {res.status(201).send('Status Created!')})
    .catch(err => {res.status(500).send(err)
    });
};


module.exports.follow = (req, res) => {
  models.Follow.forge({
      id_follower: req.user.id,
      id_followed: req.body.id
    })
    .save()
    .then(() => {res.status(201).send('Added Follow')})
    .catch(err => {res.status(500).send(err)
    });
};



////////////////  GET  /////////////////

module.exports.getNewsLike = (req, res) => {
  models.Profile.where({ username: req.params.username }).fetch()
    .then(profile => {
      console.log("****** getNewsLike profile: ", profile.attributes.id);
      return models.NewsLike.where({id_user: profile.attributes.id}).fetchAll();
    })
    .then(news => {
      const sendNews = [];
      return news.reduce((acc, eachnews) => {
        return acc
        .then(() => {
          return models.NewsItem.where({id: eachnews.attributes.id_news}).fetch();
        })
        .then((news) => {
          return sendNews.push(news.attributes);
        });
      }, Promise.resolve())
      .then(() => {
        res.status(200).send(sendNews)
      });
    })
    .error(err => {
      res.status(500).send('Error: ', err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

//fix !!!
module.exports.getStatusesLike = (req, res) => {
  models.Profile.where({ username: req.params.username }).fetch()
    .then(profile => {
      console.log("****** getStatusesLike profile: ", profile.attributes.id);
      return models.StatusLike.where({id_user: profile.attributes.id}).fetchAll();
    })
    .then(news => {
      const sendStatuses = [];
      return news.reduce((acc, eachstatus) => {
        return acc
        .then(() => {
          return models.Status.where({id: eachstatus.attributes.id_status}).fetch();
        })
        .then((status) => {
          return sendStatuses.push(status.attributes);
        });
      }, Promise.resolve())
      .then(() => {
        res.status(200).send(sendStatuses)
      });
    })
    .error(err => {
      res.status(500).send('Error: ', err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};


module.exports.getStatuses = (req, res) => {
models.Profile.where({ username: req.params.username }).fetch()
    .then(profile => {
      console.log("****** getStatusLike profile: ", profile.attributes.id);
      return models.Status.where({id_user: profile.attributes.id}).fetchAll();
    })
    .then(statuses => {
      res.status(200).send(statuses);
    })
};



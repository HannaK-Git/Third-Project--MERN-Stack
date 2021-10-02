const express = require('express');

const movieBL = require('../models/movieBL');

const router = express.Router();

router.route('/')
  .get(async function(req, resp)
  {
      let data = await movieBL.getAllMovies();
      return resp.json(data);
  })

  router.route('/:id')
    .get(async function(req, resp)
    {
        let id = req.params.id;
        let data = await movieBL.getMovieById(id);
        return resp.json(data);
    })


  router.route('/')
  .post(async function(req, resp)
  {
      let obj = req.body;
      let status = await movieBL.addMovie(obj);
      return resp.json(status);
  })

  router.route('/search/:name')
    .get(async function(req, resp)
    {
        let name = req.params.name;

        let data = await movieBL.getAllMovies();
        let result = data.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))
        return resp.json(result);
    }) 

    router.route('/:id')
  .put(async function(req, resp)
  {
      let obj = req.body;
      let id = req.params.id;
      let status = await movieBL.updateMovie(id, obj);
      return resp.json(status);
  })

  
  
  router.route('/member/:id')
    .put(async function(req, resp)
    {
      let obj = req.body;
      
      let id = req.params.id;
      let status = await movieBL.updateMemberThatWatched(id, obj);
      return resp.json(status);
    })
    

    router.route('/:id')
    .delete(async function(req, resp)
    {
      let id = req.params.id;
      let status = await movieBL.deleteMovie(id);
      return resp.json(status);
    })

  
    router.route('/deleteMember/:id')
      .put(async function(req, resp)
      {
        let obj = req.body;
        let id = req.params.id;
        let status = await movieBL.deleteOnlyMember(id, obj);
        return resp.json(status);
      })

  module.exports = router;
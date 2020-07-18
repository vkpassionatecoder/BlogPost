var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', async (req, res, next) => {
  let offset = req.query.offset;
  const blog_url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?order_by=date&number=25&offset=${offset}`;
  const blog_response = await fetch(blog_url);
  const blog_data = await blog_response.json();
  res.json(blog_data);
});

router.get('/bycategory', async (req, res, next) => {
  let category = req.query.category;
  const blog_url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?order_by=date&category=${category}`;
  const blog_response = await fetch(blog_url);
  const blog_data = await blog_response.json();
  res.json(blog_data);
});

router.get('/bytag', async (req, res, next) => {
  let tag = req.query.tag;
  const blog_url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?order_by=date&tag=${tag}&number=25`;
  const blog_response = await fetch(blog_url);
  const blog_data = await blog_response.json();
  res.json(blog_data);
});

router.get('/related', async (req, res, next) => {
  const blog_url = `  https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/7794/related`;
  const blog_response = await fetch(blog_url,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const blog_data = await blog_response.json();
  res.json(blog_data);
});
router.get('/alltags', async (req, res, next) => {
  const blog_url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/tags?order_by=count&order=DESC&number=10`;
  const blog_response = await fetch(blog_url);
  const blog_data = await blog_response.json();
  res.json(blog_data);
});

router.get('/getbyid/:id', async (req, res, next) => {
  let id = req.params.id;
  const blog_url = `https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/${id}`;
  const blog_response = await fetch(blog_url);
  const blog_data = await blog_response.json();
  res.json(blog_data);
});
module.exports = router;

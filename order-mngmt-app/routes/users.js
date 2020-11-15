var express = require('express');
var router = express.Router();

/* GET userlist. */
router.get('/userlist', function(req, res) {
  console.log("reached");
  var db = req.db;
  var collection = db.get('user');
  collection.find({},{},function(e,docs){
    console.log(res)
    res.json(docs);
  });
});

module.exports = router;
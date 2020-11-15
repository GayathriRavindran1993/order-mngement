var express = require('express');
var router = express.Router();

/* add order. */
router.post('/add', function(req, res) {
  console.log(req.body.user);
  var db=req.db;
  var user = req.body.user;
  var product = req.body.product;
  var quantity =Number( req.body.quantity);
  db.get('product').findOne({product},{},function(e,docs){
    console.log(docs.price)

    price=docs.price;
    if (quantity>=3 && product=="coca cola") {
      var total=(quantity*price)-(quantity*price*.2);

  }
  else{
      var total=quantity*price;
  }
  var date= new Date();
  db.get('order').insert({user,product,price,quantity,total,date});
  res.render('index.ejs');
  });
  
  
});

/* get order. */
router.get('/search', function(req, res) {
    var db=req.db;
    var searchText = req.query.searchText;
    var timeperiod = req.query.timeperiod;
    console.log(timeperiod);
    var searchdate;
    var queryData;
    var searchquery={'$regex': searchText, '$options': 'i'}
    if(timeperiod=="7"){

        searchdate = new Date();
        searchdate.setDate(searchdate.getDate()-7);
        console.log(searchdate);
        queryData={$and:[{'date': {$gt: searchdate}},{$or:[{user:searchquery},{product:searchquery}]}]}
        
    }
    else if ( timeperiod=="today") {
        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);
        queryData={$and:[{'date':{$gte: start, $lt: end}},{$or:[{user:searchquery},{product:searchquery}]}]}
    } else {
      console.log("here");
      queryData = {$or:[{user:searchquery},{product:searchquery}]}
      
    }
    db.get('order').find(queryData,{},function(e,docs){
      orders=docs;
      res.json(docs);
    });
    
  });
  router.delete('/delete', function(req, res) {
    var db=req.db;
    //console.log(db)
    var orderid=req.body.orderid;
    data=db.get("order").remove({_id:orderid},{},function(e,docs){
      res.json(data);
    });

  });

//edit order
router.put('/edit', function(req, res) {
  var db=req.db;
  var user = req.body.user;
  var product = req.body.product;
  var quantity =Number( req.body.quantity);
  var orderid=req.body.orderid;
  db.get('product').findOne({product},{},function(e,docs){
    console.log(docs.price)

    price=docs.price;
    if (quantity>=3 && product=="coca cola") {
      var total=(quantity*price)-(quantity*price*.2);

  }
  else{
      var total=quantity*price;
  }
  var date= new Date();
  data=db.get('order').update({_id:orderid},{$set:{user,product,price,quantity,total,date}});
  res.json(data);
  });
  
  
});
module.exports = router;
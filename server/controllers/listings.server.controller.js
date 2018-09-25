
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);


  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      //console.log(err);
      //res.status(400).send(err);
      throw err;
    } else {
      res.json(listing);
      res.status(200).send('OK');
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  let listItem = res.json(req.listing);
  res.status(200).send(listItem);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;
 // console.log("CATTTSSS");
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  //console.log(req.params);
  /*
  Listing.findOne({ code: listing.code }, function(err, doc) {
    if (err) {
      res.status(404).send('Not Found');
      throw err;
    }
    
    doc.address = listing.address;
    if(listing.coordinates != null) doc.coordinates = listing.coordinates;
    doc.save(function(err) {
      if (err) {
        res.status(404).send('Not Found');
        throw err;
      }
     

    });
    
    res.status(200).send('OK');
    listing.save();
  });
  */

  //Different attempt
  if(req.body.code != null) {
    listing.code = req.body.code;
    if(req.body.address != null) listing.address = req.body.address;
    listing.name = req.body.name;
    if(req.body.coordinates != null) listing.coordinates = req.body.coordinates;
    //res.json(listing);

    /* Then save the listing */
    mongoose.model("Listing").save(function(err) {
      if(err) {
        //console.log(err);
        //res.status(400).send(err);
        throw err;
      } else {
        res.json(listing);
        res.status(200).send('OK');
      }
    });
  }
  else {
    res.status(404).send('Not Found');
  }

 


};

/* Delete a listing */
exports.delete = function(req, res) {
  //console.log("testtstswtegfdsaf");

 var listing = req.listing;
console.log('THis');
console.log(listing);
//console.log(listing);
  /** TODO **/
  /* Remove the article */
  /*
  Listing.deleteOne({ code: listing.code }, function (err, doc) {
    // deleted the CABL doc
    console.log('SDOFiahdsofi');
    if (err) {
      res.status(404).send("Not Found");
      console.log("TESSTTT");
      throw err;
    } 
    res.status(200).send('OK');
    console.log(doc);
    
  });
  */
 //First attempt
 
 var ObjectId = mongoose.Types.ObjectId;
 let valid = ObjectId.isValid(listing._id);

if(valid) {
  // find the user with code identifier
  Listing.findOneAndRemove({ code: listing.code }, function(err, doc) {
    if (err) {
      res.status(404).send(err);
      //throw err;
      
    }
    else {
      res.json(listing);
    }
   
    // we have deleted the user

  });
}
 
 
/*
if(valid) {
  Listing.findByIdAndRemove(listing._id).exec().then(doc => {
    if(!doc) { return res.status(404).end();}
    return res.status(204).end();
  });
}
else {
  res.status(404).end();
}
  */

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */

  mongoose.model("Listing").find({}, function(err, docs) {
    if (err) {
      //res.status(404).send('Not Found');
      throw err;
    }
    //console.log(docs);
    //THIS IS WHERE THE LISTINGS ARE DISPLAYED INTHE CONSOLE LOG
    res.status(200).send(docs);
  }).collation({locale:'en',strength: 2}).sort();

};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  console.log(req.params);
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
      throw err;
    } else {
      req.listing = listing;
      next();
    }
  });
};
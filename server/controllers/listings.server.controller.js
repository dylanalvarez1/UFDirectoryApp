
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);


  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
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
 
  if(req.body.code != null) {
    listing.code = req.body.code;
    if(req.body.address != null) listing.address = req.body.address;
    listing.name = req.body.name;
    listing.updated_at = new Date();
    listing.created_at = req.body.created_at;
    if(req.body.coordinates != null) listing.coordinates = req.body.coordinates;

    /* Then save the listing */
    listing.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
        //throw err;
      } else {
        res.json(listing);
        res.status(200).send();
      }
    });
  }
  else {
    res.status(400).send();
  }

};

/* Delete a listing */
exports.delete = function(req, res) {

 var listing = req.listing;
 
  // find the user with code identifier
  Listing.findOneAndRemove({ _id: listing._id }, function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      //throw err;
    }
    else {
      res.json(listing);
      res.status(200).send();
    }

  });


};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/

  mongoose.model("Listing").find({}, function(err, docs) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      //throw err;
    }
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
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};

///CHange port, change links, do github stuff, create that other file, deploy good
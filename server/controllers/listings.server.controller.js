
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
      //console.log(err);
      res.status(404).send(err);
      //throw err;
    } else {
      res.json(listing);
      res.status(200).send();
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

        res.status(400).send(err);
        //throw err;
      } else {
        res.json(listing);
        res.status(200).send();
      }
    });
  }
  else {
    res.status(404).send();
  }

};

/* Delete a listing */
exports.delete = function(req, res) {

 var listing = req.listing;
 
 var ObjectId = mongoose.Types.ObjectId;
 let valid = ObjectId.isValid(listing._id);

if(valid) {
  // find the user with code identifier
  Listing.findOneAndRemove({ code: listing.code }, function(err) {
    if (err) {
      res.status(404).send(err);

    }
    else {
      res.json(listing);
    }

  });
}

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/

  mongoose.model("Listing").find({}, function(err, docs) {
    if (err) {
      res.status(404).send(err);
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
angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.data = {};

    $scope.addListing = function() {
  
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
  //This might be only changing the list in the app, not the database
  /*
    app.post('/api/listings/:code', (req, res, next) => {
      if($scope.data != {}) {
        res.status(201).send($scope.data);
        $scope.listings.push($scope.data);
        $scope.data = null;
        Listings.getAll(); //Repopulate the page? might be out of scope.
      }
      else {
        res.status(400).send('Not Found');
        console.log('Not found');
      }
    });
    */
   
    if($scope.data != {}) {
      Listings.create($scope.data);
      //location.reload();
     // $scope.listings.push($scope.data);
      $scope.data = null;
      Listings.getAll().then(function(response) {
        $scope.listings = response.data;
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });
      
    }
    else {
      console.log('Not found');
    }
 
    
    
    };

    $scope.deleteListing = function(listing) {
      console.log('Delete a listing, called in listingcontroller.js');
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      let v;
      let deleted = false;
    
      /*
      app.delete('/expressions/:code', (req, res, next) => {
        angular.forEach($scope.listings,function(v){
          if(v == listing)
          {
            $scope.listings.splice(v, 1); //Remove the listing
            deleted = true;
            res.status(204).send('OK');
          }
        }); 

        if(!deleted) {
          res.status(404).send('Not Found');
        }

      });
      */
      //console.log(listing);
      Listings.delete(listing._id);
      Listings.getAll().then(function(response) {
        $scope.listings = response.data;
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });
      //location.reload();

      

    };

    $scope.showDetails = function(listing) {
      $scope.detailedInfo = undefined;
      $scope.detailedInfo = listing; 
       if(listing.name != null)
       {
         $scope.detailedInfo.name = `${listing.name}`;
       }
 
       if(listing.code != null)
       {
         $scope.detailedInfo.code = `${listing.code}`;
       }
 
       if(listing.address != null)
       {
         $scope.detailedInfo.address = `${listing.address}`;
       }
 
       if(listing.coordinates != null)
       {
         if(listing.coordinates.longitude != null)
         {
           $scope.detailedInfo.longitude = `${listing.coordinates.longitude}`;
         }
         
         if(listing.coordinates.latitude != null)
         {
           $scope.detailedInfo.latitude = `${listing.coordinates.latitude}`;
         }
 
       }
       
    };
  }
]);
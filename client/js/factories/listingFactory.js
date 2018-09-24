angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
    }, 

    delete: function(listing) {
	   /**TODO
        return result of HTTP delete method
       */
      console.log("meme");
      return $http.delete('http://localhost:8080/api/listings/:listingId', listing);
    }
  };

  return methods;
});
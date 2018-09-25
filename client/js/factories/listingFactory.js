angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
    }, 

    delete: function(listingId) {
	   /**TODO
        return result of HTTP delete method
       */
      return $http.delete('./api/listings/' + listingId);
    }
  };

  return methods;
});
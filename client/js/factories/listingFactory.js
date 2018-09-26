angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://floating-hamlet-84385.herokuapp.com/api/listings');
    },
	
	create: function(listing) {
	  return $http.post('https://floating-hamlet-84385.herokuapp.com/api/listings', listing);
    }, 

    delete: function(listingId) {
      return $http.delete('./api/listings/' + listingId);
    }
  };

  return methods;
});
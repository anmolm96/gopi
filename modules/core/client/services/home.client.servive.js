(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('core.services')
    .factory('CoreService', CoreService);

  CoreService.$inject = ['$resource'];

  function CoreService($resource) {
    var Core = $resource('/', {}, {
      pay: {
        method: 'POST',
        url: '/rzp-payment'
      }
    });

    angular.extend(Core, {
      payment: function(paymentInfo) {
        return this.pay(paymentInfo).$promise;
      }
    });

    return Core;
  }
}());

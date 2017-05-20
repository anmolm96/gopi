(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication'];

  function HomeController($scope, $state, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    console.log(vm.authentication);
    vm.time_options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00'];
    vm.end_slot = vm.time_options[vm.time_options.indexOf(vm.authentication.user.timeSlot)+1] || '10:30' ;
    vm.milkType = JSON.parse(vm.authentication.user.milkType);
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication', 'Notification'];

  function EditProfileController($scope, $http, $location, UsersService, Authentication, Notification) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;

    vm.amount_options = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0'];
    vm.time_options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00'];
    vm.type_options = [];
    vm.amount_select_change = function() {
      var quant = parseInt(vm.credentials.quantity, 10);
      for (var i = 0.0; i <= quant; i += 0.5) {
        vm.type_options.push({ 'toned': i, 'double-toned': quant - i });
      }
    };

    // Update a user profile
    function updateUserProfile(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Edit Order successful!' });
        Authentication.user = response;
      }, function (response) {
        Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Edit Order failed!' });
      });
    }
  }
}());

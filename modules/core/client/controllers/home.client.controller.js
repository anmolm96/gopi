(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication', 'CoreService'];

  function HomeController($scope, $state, Authentication, CoreService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.time_options = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00'];
    if(vm.authentication) {
      vm.end_slot = vm.time_options[vm.time_options.indexOf(vm.authentication.user.timeSlot)+1] || '10:30' ;
      vm.milkType = JSON.parse(vm.authentication.user.milkType);
    }

    vm.rzp_opts = {
        "key": "rzp_test_xgWq0hOQj9Pny1",
        "amount": vm.authentication.user.amountDue * 100, // 2000 paise = INR 20
        "name": "Gopi",
        "description": "Milk",
        "handler": function (response){
            CoreService.payment({
              payment_id: response.razorpay_payment_id,
              amount: vm.authentication.user.amountDue * 100
            });

        },
        "prefill": {
            "contact": vm.authentication.user.phoneNum,
            "name": vm.authentication.user.displayName,
            "email": vm.authentication.user.email
        },
        "notes": {
            "note": vm.authentication.user.runningBill
        },
        "theme": {
            "color": "#F37254"
        }
    };

    vm.pay = function() {
      var rzp1 = new Razorpay(vm.rzp_opts);
      rzp1.open();
     };

  }
}());

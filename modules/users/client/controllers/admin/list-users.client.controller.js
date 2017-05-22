(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService'];

  function UserListController($scope, $filter, AdminService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.pdf = pdf;

    AdminService.query(function (data) {
      vm.users = data;
      vm.buildPager();
    });

    function pdf() {
      var doc = new jsPDF();
      doc.autoTable(getColumns(), getData(), {
        styles: {fontSize: 8, overflow: 'linebreak', columnWidth: 'wrap'},
        columnStyles: {text: {columnWidth: 'auto'}},
        bodyStyles: {valign: 'top'},
      });
      doc.save("users.pdf");
    }

    function getColumns() {
      return [
        {title: "Name", dataKey: "name"},
        {title: "Phone Number", dataKey: "phone"},
        {title: "Address", dataKey: "address"},
        {title: "Time Slot", dataKey: "time"},
        {title: "Milk Type", dataKey: "milk"},
        {title: "Active", dataKey: "active"},
      ];
    }

    function getData() {
      var data = [];
      vm.users.forEach(function(user){
        data.push({
          name: user.displayName,
          phone: user.phoneNum || 'N/A',
          address: user.address || 'N/A',
          time: user.timeSlot || 'N/A',
          milk: user.milkType || 'N/A',
          active: user.active || 'N/A',
        });
      });

      return data;
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

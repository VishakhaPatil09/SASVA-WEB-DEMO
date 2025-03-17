angular.module('labAngularJsApp').controller('ViewPatientModalController', ['$uibModalInstance', 'patient', function($uibModalInstance, patient) { 
    var vm = this; 
    console.log('Closing view patient modal***',patient);
    vm.patient = patient; 
 
    vm.close = function() { 
        console.log('Closing view patient modal'); 
        $uibModalInstance.dismiss('cancel'); 
    }; 
}]);
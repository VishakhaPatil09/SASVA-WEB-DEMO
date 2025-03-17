angular.module('labAngularJsApp').controller('EditPatientModalController', ['$uibModalInstance', 'patient', function($uibModalInstance, patient) { 
    var vm = this; 
    vm.patient = patient; 
 
    vm.submit = function() { 
        try { 
            console.log('Submitting updated patient data:', vm.patient); 
            $uibModalInstance.close(vm.patient); 
        } catch (error) { 
            console.error('Error submitting patient data:', error); 
        } 
    }; 
 
    vm.cancel = function() { 
        try { 
            console.log('Cancelling edit patient modal'); 
            $uibModalInstance.dismiss('cancel'); 
        } catch (error) { 
            console.error('Error cancelling edit patient modal:', error); 
        } 
    }; 
}]);
angular.module('labAngularJsApp').controller('DashboardController', ['$http', '$uibModal', function($http, $uibModal) { 
    var vm = this; 
    vm.patients = []; 
    vm.currentPage = 1; 
    vm.pageSize = 10; 
    vm.totalPages = 0; 
 
    vm.loadPatients = function() { 
        $http.get('/api/patients') 
            .then(function(response) { 
                console.log('Patients data fetched successfully'); 
                vm.patients = response.data; 
                vm.totalPages = Math.ceil(vm.patients.length / vm.pageSize); 
            }) 
            .catch(function(error) { 
                console.error('Error fetching patients:', error); 
            }); 
    }; 
 
    vm.newOrder = function() { 
        // Logic for creating a new order 
        console.log('New Order button clicked'); 
    }; 
 
    vm.viewPatient = function(patient) { 
        var modalInstance = $uibModal.open({ 
            templateUrl: 'viewPatientModal.html', 
            controller: 'ViewPatientModalController', 
            controllerAs: 'vm',
           animation: false, 
            resolve: { 
                patient: function() { 
                    return patient; 
                } 
            } 
        }); 

        // modalInstance.opened.then(function() {
        //     document.querySelector('.modal').focus(); // Ensure modal gets focus
        // });

        // modalInstance.opened.then(function() {
        //     document.querySelector('.container').removeAttribute('aria-hidden');
        // });
 
        modalInstance.result.catch(function(error) { 
            console.error('Error opening view patient modal:', error); 
        }); 
    }; 
 
    vm.editPatient = function(patient) { 
        var modalInstance = $uibModal.open({ 
            templateUrl: 'editPatientModal.html', 
            controller: 'EditPatientModalController', 
            controllerAs: 'vm', 
            animation: false, 
            resolve: { 
                patient: function() { 
                    return angular.copy(patient); 
                } 
            } 
        }); 
 
        modalInstance.result.then(function(updatedPatient) { 
            if (updatedPatient) { 
                $http.put('/api/patients/' + updatedPatient._id, updatedPatient) 
                    .then(function(response) { 
                        console.log('Patient updated successfully'); 
                        vm.loadPatients(); 
                    }) 
                    .catch(function(error) { 
                        console.error('Error updating patient:', error); 
                    }); 
            } 
        }).catch(function(error) { 
            console.error('Error opening edit patient modal:', error); 
        }); 
    }; 
 
    vm.deletePatient = function(patientId) { 
        if (confirm('Are you sure you want to delete this patient?')) { 
            $http.delete('/api/patients/' + patientId) 
                .then(function(response) { 
                    console.log('Patient deleted successfully'); 
                    vm.loadPatients(); 
                }) 
                .catch(function(error) { 
                    console.error('Error deleting patient:', error); 
                }); 
        } 
    }; 
 
    vm.changePage = function(page) { 
        if (page > 0 && page <= vm.totalPages) { 
            vm.currentPage = page; 
            console.log('Page changed to:', vm.currentPage); 
        } else { 
            console.error('Invalid page number:', page); 
        } 
    }; 
 
    // Load patients on initialization 
    vm.loadPatients(); 
}]);
const fs = require('fs');

const EventEmitter = require('events');

function getProducts() {
    
    const emitter = new EventEmitter();

    fs.readFile('data.txt', 'utf8', function(err, data) {
        if (!err) {
            emitter.emit('event', data.split('\n'));
        }
    });

    return emitter;
}

function boot() {
    angular
    .module('app', [])
    .controller('ProductsCtrl', ['$scope', function($scope) {
                
        $scope.title = "Product list";
        
        getProducts().on('event', function(data) {
            $scope.products = data;
            $scope.$apply();
        });
    }])
    
    angular.bootstrap(document, ['app'], {
        strictDi: true
    })
}

document.addEventListener('DOMContentLoaded', boot);

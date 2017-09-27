import angular from 'angular'

angular
     .module('my-app', [])
     .directive('app', () => {
          return {
               template: require('./directives/app.html'),
               restrict: 'E'
          }
     })

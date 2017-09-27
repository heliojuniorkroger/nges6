import angular from 'angular'

angular
     .module('{{ name }}', [])
     .directive('app', () => {
          return {
               template: require('./directives/app.html'),
               restrict: 'E'
          }
     })

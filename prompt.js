module.exports = name => {
     return [
          {
               type: 'input',
               name: 'name',
               default: name,
               message: "What's your ng-app name?"
          },
          {
               type: 'input',
               name: 'title',
               default: 'My App',
               message: "A cool title for your aplication"
          },
          {
               type: 'input',
               name: 'description',
               default: 'My awesome AngularJS application',
               message: "Give a nice description to your application"
          },
          {
               type: 'input',
               name: 'author',
               message: "The author name"
          }
     ]
}

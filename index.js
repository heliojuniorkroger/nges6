#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const Handlebars = require('handlebars')
const fs = require('fs')
const fsExtra = require('fs-extra')
const colors = require('colors')
const cp = require('child_process')
const path = require('path')

program
     .command('create <name>')
     .description('Create an AngularJS application w/ Webpack')
     .action(name => {
          inquirer.prompt(require('./prompt')(name))
               .then(answers => {
                    fsExtra.copy(__dirname + '/template', './' + name, err => {
                         if (err) throw err
                         fs.readFile(__dirname + '/template/package.json', (err, source) => {
                              if (err) throw err
                              fs.writeFile('./' + name + '/package.json', Handlebars.compile(source.toString())({
                                   name: answers.name,
                                   description: answers.description,
                                   author: answers.author
                              }), err => {
                                   if (err) throw err
                                   fs.readFile(__dirname + '/template/public/index.html', (err, source) => {
                                        if (err) throw err
                                        fs.writeFile('./' + name + '/public/index.html', Handlebars.compile(source.toString())({
                                             title: answers.title,
                                             name: answers.name
                                        }), err => {
                                             if (err) throw err
                                             fs.readFile(__dirname + '/template/src/index.js', (err, source) => {
                                                  if (err) throw err
                                                  fs.writeFile('./' + name + '/src/index.js', Handlebars.compile(source.toString())({
                                                       name: answers.name
                                                  }), err => {
                                                       if (err) throw err
                                                       fs.readFile(__dirname + '/template/src/view/app.html', (err, source) => {
                                                            if (err) throw err
                                                            fs.writeFile('./' + name + '/src/view/app.html', Handlebars.compile(source.toString())({
                                                                 title: answers.title
                                                            }), err => {
                                                                 if (err) throw err
                                                                 console.log(colors.cyan('Installing dependencies...'))
                                                                 cp.exec('npm install', {cwd: './' + name}, err => {
                                                                      if (err) throw err
                                                                      console.log(colors.green('Done!'))
                                                                      console.log(colors.cyan('Run cd ' + name + ' and start hacking!'))
                                                                 })
                                                            })
                                                       })
                                                  })
                                             })
                                        })
                                   })
                              })
                         })
                    })
               })
     })

program.parse(process.argv)

'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs')

module.exports = class extends Generator {

  constructor(args, opts) {
    //Generator.Base.apply(this, args);
    super(args, opts);
    //Generator.Base.apply(this, arguments);
    //console.log(args);
    //console.log(opts);

    // set arguments here




  }

  initializing() {

  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('generator-angular-2-preandlazyload') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentname',
      message: 'What is your componentname ?',
      default: path.parse(process.cwd()).name, // Default to current folder name
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }



  writing() {

    //console.log(this.props);


    this.props.customobject = {};
    this.props.customobject.componentname = this.props.componentname.replace(/component-/g, '');
    this.props.customobject.componentname = this.props.customobject.componentname.toLowerCase();
    //this.props.customobject.componentname =  this.props.customobject.componentname.charAt(0).toUpperCase() + this.props.customobject.componentname.slice(1).toLowerCase();


    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/index.ts'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.html'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.html'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.less'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.less'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.scss'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.scss'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.css'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.css'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.ts'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.ts'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.spec.ts'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.spec.ts'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.e2e.ts'),
      this.destinationPath('./src/app/components/' + this.props.customobject.componentname + '/' + this.props.customobject.componentname + '.component.e2e.ts'),
      this.props.customobject
    );


    var someFile = "./src/app/app.module.ts";

    var replacement_1 = "CMP-level component from generator\n";
    replacement_1 = replacement_1 + "import { " + this.props.customobject.componentname + "Component  } from './components/" + this.props.customobject.componentname + "';"

    var replacement_2 = "CMP-level component_declaration from generator\n\t\t";
    replacement_2 = replacement_2 + this.props.customobject.componentname + "Component,"

    fs.readFile(someFile, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      //console.log(data);
      var result_1 = data.replace(/CMP-level component from generator/g, replacement_1);


      var result_2 = result_1.replace(/CMP-level component_declaration from generator/g, replacement_2);

      //console.log(result);
      fs.writeFile(someFile, result_2, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });







  }


}
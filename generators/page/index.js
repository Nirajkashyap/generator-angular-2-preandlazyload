'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var fs = require('fs');

module.exports = class extends Generator {
  
   constructor (args, opts) {
      //Generator.Base.apply(this, args);
      super(args, opts);
      //Generator.Base.apply(this, arguments);
      //console.log(args);
      //console.log(opts);
      
      // set arguments here 
     
      
     

  }
  
  initializing () {
    
  }
  
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('generator-genrator-wb') + ' generator!'
    ));

    var prompts = [ {
            type: 'input',
            name: 'pagename',
            message: 'What is your pagename ?',
            default: path.parse(process.cwd()).name, // Default to current folder name
            store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing () {

    console.log(this.props);
    
    
    this.props.customobject = { };
    this.props.customobject.pagename = this.props.pagename.replace(/component-/g,'');
    this.props.customobject.pagename =  this.props.customobject.pagename.toLowerCase();
     
    
    this.fs.copyTpl(
      this.templatePath('_index.ts'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/index.ts'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.html'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.html'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.less'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.less'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.scss'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.scss'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.css'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.css'),
      this.props.customobject
    );

    
    this.fs.copyTpl(
      this.templatePath('_base.component.ts'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.ts'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.spec.ts'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.spec.ts'),
      this.props.customobject
    );

    this.fs.copyTpl(
      this.templatePath('_base.component.e2e.ts'),
      this.destinationPath('./src/app/pages/'+ this.props.customobject.pagename + '/' + this.props.customobject.pagename + '.component.e2e.ts'),
      this.props.customobject
    );    


    var someFile = "./src/app/app.module.ts";
    
    var replacement_1 = "PAGE-level component from generator\n";
    replacement_1 = replacement_1 + "import { " + this.props.customobject.pagename + "Component  } from './pages/" + this.props.customobject.pagename + "';"
    
    var replacement_2 = "PAGE-level component_declaration from generator\n\t\t";
    replacement_2 = replacement_2  + this.props.customobject.pagename + "Component,"
    
    fs.readFile(someFile, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      //console.log(data);
      var result_1 = data.replace(/PAGE-level component from generator/g, replacement_1);
      
     
      var result_2 = result_1.replace(/PAGE-level component_declaration from generator/g, replacement_2);
      
      //console.log(result);
      fs.writeFile(someFile, result_2, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });

    //ROUTE genenration
    var replacement_3 = "ROUTE genenration pathsyntax\n";
    replacement_3 = replacement_3 + "}, {\n\t"; 
    replacement_3 = replacement_3 + "path: '" + this.props.customobject.pagename + "',\n\t";
    replacement_3 = replacement_3 + "component: " + this.props.customobject.pagename + "Component"

    var replacement_4 = "ROUTE genenration importsyntax\n";
    replacement_4 =  replacement_4 + "import { " + this.props.customobject.pagename + "Component  } from './pages/" + this.props.customobject.pagename + "';"
    var someFile2 = "./src/app/app.routes.ts";
    fs.readFile(someFile2, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      //console.log(data);
      var result_1 = data.replace(/ROUTE genenration pathsyntax/g, replacement_3);
      
      var result_2 = result_1.replace(/ROUTE genenration importsyntax/g, replacement_4); 
      
      //console.log(result);
      fs.writeFile(someFile2, result_2, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });

  }

 
}

'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the breathtaking ' + chalk.red('generator-angular-2-preandlazyload') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is your project name?',
        default: path.parse(process.cwd()).name, // Default to current folder name
        store: true
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a short project description:',
        default: '',
        store: true
      },
      {
        type: 'input',
        name: 'version',
        message: 'What semver version should the project start on?',
        default: '0.0.0',
        store: true
      },
      {
        type: 'input',
        name: 'license',
        message: 'What license is the project distributed under?',
        default: 'UNLICENSED',
        store: true
      },
      {
        type: 'confirm',
        name: 'isprivate',
        message: 'Is this a private project?',
        default: true,
        store: true
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who/what is the author of this project?',
        default: '',
        store: true
      },
      {
        type: 'input',
        name: 'username',
        message: 'What is your github user/organisation name?',
        store: true
      },
      // {
      //   type: 'confirm',
      //   name: 'cssprocessor',
      //   message: 'css processor ?',
      //   default: true,
      //   store: true
      // },
      // {
      //   when: function (prompts) {     
      //   prompts.cssstyle = 'none';   
      //   return prompts.cssprocessor;
      //   },
      //   type: 'list',
      //   name: 'cssstyle',
      //   store: true,
      //   default: 'scss',
      //   message: 'less or sccs?',
      //   choices: ['less', 'scss'],
      //   filter: function (val) {
      //     return val.toLowerCase();
      //   }
      // },
      {
        type: 'confirm',
        name: 'jquery',
        message: 'Would you like to use jquery ?',
        default: true
      },
      {
        when: function (prompts) {
        // console.log(prompts);
        prompts.bootstrap = false;
        return prompts.jquery;
        },
        type: 'confirm',
        name: 'bootstrap',
        message: 'Would you like to use bootstrap css 3.7 ?',
        default: true
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // console.log(this.props.cssstyle);
    // if (this.props.cssstyle === "less") {

    //   this.props.less = true;
    //   this.props.scss = false;
    // } else {
    //   this.props.less = false;
    //   this.props.scss = true;
    // }
    
    // copy sample file
    this.fs.copy(
      this.templatePath('_dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );

    this.fs.copy(
      this.templatePath('_README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copy(
      this.templatePath('_.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('./.vscode'),
      this.destinationPath('./.vscode')
    );

    this.fs.copy(
      this.templatePath('_.gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('_karma.conf.js'),
      this.destinationPath('karma.conf.js')
    );

    this.fs.copy(
      this.templatePath('_protractor.conf.js'),
      this.destinationPath('protractor.conf.js')
    );

    this.fs.copy(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('_tsconfig.webpack.json'),
      this.destinationPath('tsconfig.webpack.json')
    );

    this.fs.copy(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.copy(
      this.templatePath('_typedoc.json'),
      this.destinationPath('typedoc.json')
    );

    this.fs.copy(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    //console.log(this.props);
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copy(
      this.templatePath('./config'),
      this.destinationPath('./config')
    );

    this.fs.copy(
      this.templatePath('./src'),
      this.destinationPath('./src')
    );
    // console.log(this.props);
    this.fs.copyTpl(
      this.templatePath('./src/app/app.module.ts'),
      this.destinationPath('./src/app/app.module.ts'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('./src/styles/index.css'),
      this.destinationPath('./src/styles/index.css'),
      this.props
    );


    // if (this.props.cssstyle === "less") {
    //   console.log("removing sccs file");
    //   this.fs.delete(this.destinationPath('./src/*.scss'));
    // } else {
    //   console.log("removing less file");
    //   this.fs.delete(this.destinationPath('./src/*.less'));
    // }
  },

  install: function () {
    // this.yarnInstall();
    
    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false
    });
  }
});


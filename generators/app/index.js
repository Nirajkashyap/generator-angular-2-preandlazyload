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
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

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



  },

  install: function () {
    //this.yarnInstall();
    console.log("dont use yarn for now")
    this.installDependencies({
      yarn: false,
      npm: true,
      bower: false
    });
  }
});

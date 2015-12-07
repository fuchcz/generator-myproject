'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slugify = require('slugg');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the delightful ' + chalk.yellow('MyProject') + ' generator!'
        ));
        var licenses = [
            { name: 'proprietary', value: 'proprietary' },
            { name: 'MIT', value: 'mit' }
        ];
        var prompts = [
            {
                name: 'name',
                message: 'name:',
                default: slugify(this.appname)
            },
            {
                name: 'description',
                message: 'description:'
            },
            {
                name: 'homepage',
                message: 'homepage:'
            },
            {
                name: 'repository',
                message: 'repository:'
            },
            {
                name: 'version',
                message: 'version:',
                default: '0.0.1'
            },
            {
                name: 'aname',
                message: 'author:',
                default: this.user.git.name()
            },
            {
                name: 'aemail',
                message: 'author\'s e-mail:',
                default: this.user.git.email()
            },
            {
                name: 'aurl',
                message: 'author\'s url:'
            },
            {
                type: 'checkbox',
                name: 'bowercomponents',
                message: 'bower_components:',
                choices: ['bootstrap', 'adminlte'],
                default: ['bootstrap']
            },
            {
                type: 'list',
                name: 'license',
                message: 'license:',
                choices: licenses
            },
            {
                name: 'dbname',
                message: 'database name:'
            },
            {
                name: 'dbusername',
                message: 'database username:'
            },
            {
                name: 'dbpassword',
                message: 'database password:'
            },

        ];
        this.prompt(prompts, function (props) {
            this.props = props;
            done();
        }.bind(this));
    },
    writing: function () {
        mkdirp(this.destinationPath('.prep'));
        this.fs.copy(
            this.templatePath('_bowerrc'),
            this.destinationPath('.bowerrc')
        );
        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore')
        );
        this.fs.copy(
            this.templatePath('_gruntfile.js'),
            this.destinationPath('gruntfile.js')
        );
        this.directory(
            this.templatePath('private'),
            this.destinationPath('private')
        );
        this.directory(
            this.templatePath('web'),
            this.destinationPath('web')
        );
        this.fs.copyTpl(
            this.templatePath('_private/app/config/_config.local.neon'),
            this.destinationPath('private/app/config/config.local.neon'),
            {
                database: this.props.dbname,
                username: this.props.dbusername,
                password: this.props.dbpassword
            }
        );
        var date = new Date();
        this.fs.copyTpl(
            this.templatePath('_license-' + this.props.license + '.txt'),
            this.destinationPath('license.md'),
            {
                author: {
                    name: this.props.aname,
                    email: this.props.aemail
                },
                year: date.getFullYear()
            }
        );
        var components = this.props.bowercomponents.toString().split(',');
        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            {
                name: this.props.name,
                author: {
                    name: this.props.aname,
                    email: this.props.aemail
                },
                description: this.props.description,
                homepage: this.props.homepage,
                version: this.props.version,
                repository: this.props.repository,
                license: this.props.license,
                bowercomponents: this.props.bowercomponents,
                components: components

            }
        );
        this.fs.copyTpl(
            this.templatePath('_composer.json'),
            this.destinationPath('composer.json'),
            {
                name: this.props.name,
                description: this.props.description,
                homepage: this.props.homepage,
                author: {
                    name: this.props.aname,
                    email: this.props.aemail
                },
                license: this.props.license
            }
        );
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                name: this.props.name,
                version: this.props.version,
                description: this.props.description,
                repository: this.props.repository,
                author: {
                    name: this.props.aname,
                    email: this.props.aemail,
                    url: this.props.aurl
                },
                license: this.props.license
            }
        );
        this.fs.copyTpl(
            this.templatePath('_readme.md'),
            this.destinationPath('readme.md'),
            {
                name: this.props.name
            }
        );
    },
    install: function () {
        this.spawnCommandSync('composer', ['install']);
        this.spawnCommandSync('bower', ['install', 'jquery', '--save']);
        var components = this.props.bowercomponents.toString().split(',');
        for (var i = 0, len = components.length; i < len; i++) {
            this.spawnCommandSync('bower', ['install', components[i], '--save']);
        }
    },
    end: function() {
        this.log('\n' + chalk.yellow('DON\'T FORGET TO RUN ') + chalk.red('npm update --save-dev') + chalk.yellow(' !!!'));
        this.log(yosay('Bye!'));
    }


});

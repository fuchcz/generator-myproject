module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            front: {
                src: [
                    'private/app/modules/Front/**/@layout.latte'
                ],
                options: {
                    exclude: [
                        '/AdminLTE/'
                    ]
                }
            },
            admin: {
                src: [
                    'private/app/modules/Admin/**/@layout.latte'
                ]
            },
            options: {
                ignorePath: '../../../../../web'
            }
        },
        watch: {
            latte: {
                files: ['private/app/**/*.latte', 'web/**/*.css'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('default', [
    ]);

    grunt.registerTask('build', [
    ]);

}

module.exports = function(grunt) {

    // Configure task(s)
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            // doesnt need to be called build, we can call it whatever we want 
            build: {
                src: ['js/vendor/covervid/covervid.js', 'js/main.js'],
                dest: 'js/script.min.js'
            },

            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['js/vendor/covervid/covervid.js', 'js/main.js'],
                dest: 'js/script.min.js'
            }   
        },



        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['uglify:dev']
            },
                css: {
                files: ['scss/**/*.scss'], // <-- when these files change
                tasks: ['sass:dev'] // <-- run this task
            },
            html: {
                files: ['*.html']
            }
        },



        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'css/application.css' : 'scss/application.scss'
                }
            },

            build: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/application.css' : 'scss/application.scss'
                }
            }
        },






    });


    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    // Register tasks(s)
    grunt.registerTask('default', ['uglify:dev', 'sass:dev']);
    grunt.registerTask('build', ['uglify:build', 'sass:build']);

};

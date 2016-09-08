module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-jquerymanifest');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.initConfig({
        pkg   : grunt.file.readJSON('package.json'),
        bower : {
            install: {
                options: {
                    targetDir     : './vendor/bower',
                    layout        : 'byType',
                    install       : true,
                    verbose       : true,
                    cleanTargetDir: false,
                    bowerOptions  : {
                        forceLatest: true
                    }
                }
            }
        },
        copy          : {
            build    : {
                files: [
                    {expand: true, flatten: true, src: ['src/*'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                banner          : '<%= pkg.banner %>',
                sourceMap       : 'dist/<%= pkg.name %>.min.js.map',
                sourceMappingURL: '<%= pkg.name %>.min.js.map'
            },
            build  : {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.originalName %>.js'
                }
            }
        },
        cssmin: {
            options: {
                roundingPrecision: -1,
                sourceMap        : true
            },
            target : {
                files: {
                    'dist/<%= pkg.name %>.min.css': ['src/*.css']
                }
            }
        }
    });

    grunt.registerTask('install', ['bower']);
    grunt.registerTask('compile', ['uglify', 'cssmin', 'copy:build']);
    grunt.registerTask('build', ['compile', 'jquerymanifest']);
};

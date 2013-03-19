module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noempty: true,
                nonew: true,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                white: true,
                indent: 4,
                quotmark: "double"
            },
            uses_defaults: [
                "lib/Placeholders.js"
            ],
            with_overrides: {
                options: {
                    browser: false,
                    node: true
                },
                files: {
                    src: [
                        "Gruntfile.js",
                        "package.json"
                    ]
                }
            }
        },
        uglify: {
            build: {
                src: "lib/Placeholders.js",
                dest: "build/Placeholders.min.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [
        "jshint",
        "uglify"
    ]);
};
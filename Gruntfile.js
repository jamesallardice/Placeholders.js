module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: {
                globals: {
                    Placeholders: true
                },
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
                "lib/main.js"
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
        concat: {
            dist: {
                src: [
                    "lib/utils.js",
                    "lib/main.js"
                ],
                dest: "build/Placeholders.js"
            }
        },
        uglify: {
            options: {
                banner: "/* Placeholders.js v<%= pkg.version %> */\n"
            },
            build: {
                src: "build/Placeholders.js",
                dest: "build/Placeholders.min.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [
        "jshint",
        "concat",
        "uglify"
    ]);
};
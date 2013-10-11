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
                onevar: true,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                white: true,
                indent: 4,
                quotmark: "double"
            },
            uses_defaults: [
                "lib/main.js",
                "lib/utils.js"
            ],
            override_node: {
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
            },
            override_jquery: {
                options: {
                    jquery: true
                },
                files: {
                    src: ["lib/adapters/placeholders.jquery.js"]
                }
            },
            override_prototype: {
                options: {
                    prototypejs: true,
                    validthis: true,
                    "-W020": true // We have to overwrite a prototype built-in method
                },
                files: {
                    src: ["lib/adapters/placeholders.prototype.js"]
                }
            },
            override_yui: {
                options: {
                    yui: true
                },
                files: {
                    src: ["lib/adapters/placeholders.yui3.js"]
                }
            }
        },
        concat: {
            basic: {
                src: [
                    "lib/utils.js",
                    "lib/main.js"
                ],
                dest: "build/placeholders.js"
            },
            jquery: {
                src: [
                    "lib/utils.js",
                    "lib/main.js",
                    "lib/adapters/placeholders.jquery.js"
                ],
                dest: "build/placeholders.jquery.js"
            },
            prototype: {
                src: [
                    "lib/utils.js",
                    "lib/main.js",
                    "lib/adapters/placeholders.prototype.js"
                ],
                dest: "build/placeholders.prototype.js"
            },
            yui3: {
                src: [
                    "lib/utils.js",
                    "lib/main.js",
                    "lib/adapters/placeholders.yui3.js"
                ],
                dest: "build/placeholders.yui3.js"
            }
        },
        uglify: {
            options: {
                banner: "/* Placeholders.js v<%= pkg.version %> */\n"
            },
            build: {
                files: {
                    "build/placeholders.min.js": ["build/placeholders.js"],
                    "build/placeholders.jquery.min.js": ["build/placeholders.jquery.js"],
                    "build/placeholders.prototype.min.js": ["build/placeholders.prototype.js"],
                    "build/placeholders.yui3.min.js": ["build/placeholders.yui3.js"]
                }
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
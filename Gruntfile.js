module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: [
                "lib/Placeholders.js",
                "Gruntfile.js",
                "package.json" // JSHint is capable of standalone JSON validation
            ],
            options: {
                browser: true
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
module.exports = function (grunt) {
    "use strict";
    // require path.
    // Path is a nodejs module: http://nodejs.org/api/path.html
    var path = require('path');

    // read port argument from command line if any.
    //
    // To change default port, use grunt qith a --port argument:
    //
    // `grunt dev --port=8000`
    var port = grunt.option('port') || 1337;

    grunt.initConfig({
        // load package.json content
        // as pkg config.
        pkg: grunt.file.readJSON('package.json'),

        // configure server
        // relies on [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect#readme)
        //
        // There is 2 server modes: **dev** and **release**.
        //
        // **connect:dev** serve all static files for development environment.
        // Following order is used to find files:
        //
        // * bower_components (mapped on /bower_components)
        // * public (mapped on /)
        // * src (mapped on /js)
        //
        // **connect:release*** only serve public directory, used to TEST build package.
        connect: {
            options: {
                port: port,
                hostname: '*'
            },
            dev: {
                options: {
                    middleware: function (connect) {
                        return [
                            // serve vendor directory under '/bower_components'
                            // url.
                            // This is first as we always want the latest vendors
                            // in development mode.
                            vendorsDir(connect),
                            // serve public directory content
                            publicDir(connect),
                            // if no file matches in public directory,
                            // serve existing files from
                            jsSourcesDir(connect)
                        ];
                    }
                }
            },
            //
            // **DO NOT USE THIS IN PRODUCTION**
            //
            // You might rely on http servers such as
            // nginx or apache.
            release: {
                options: {
                    // only serve public directory.
                    base: 'public'
                }
            }
        },

        // Requirejs compilation depends on the environment.
        //
        // ### Development
        //
        // requirejs, `src/config.js` and `src/kernel.js` are concatenated into
        // a single `public/index.js` files.
        //
        // This allow lazy loading of dependencies.
        //
        // ### Release
        //
        // Almond is a minimal AMD compatible library. It does not have the
        // network layer, so it can be used as a minimal implementation
        // with compiled file.
        //
        // so `src/kernel` is compiled using `r.js`, then almond and
        // `src/config.js` are prepend so everything fits in a single
        // compressed `public/index.js` file.
        //
        // This approach allows to use the exact same html (with a single
        // include) for both environments.
        requirejs: {
            release: {
                options: {
                    baseUrl: "src",
                    mainConfigFile: "src/config.js",
                    name: "kernel",
                    out: "public/js/index.js"
                }
            }
        },

        concat: {
            dev: {
                src: [
                    'bower_components/requirejs/require.js',
                    'src/config.js',
                    'src/kernel.js'
                    ],
                dest: 'public/js/index.js'
            },

            release: {
                src: [
                    'bower_components/almond/almond.js',
                    'src/config.js',
                    // use previously compiled file.
                    'public/js/index.js'
                    ],
                dest: 'public/js/index.js'
            }
        },

        watch: {
            kernel: {
                files: ['src/config.js','src/kernel.js'],
                tasks: ['concat:dev']
            }
        },

        // This task is useful to run parallel tasks
        // It relies on https://github.com/sindresorhus/grunt-concurrent
        //
        // This is the only way to have connect and watch to run together
        concurrent: {
            dev: {
                tasks: ['watch:kernel', 'connect:dev:keepalive'],
                options: {
                    // number of // processes
                    limit: 2,
                    logConcurrentOutput: true
                }
            }
        }
    });

    // load all npm tasks.
    // This relies on https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // Main tasks.
    grunt.registerTask('app:dev', 'Build development javascript application.', ['concat:dev']);
    grunt.registerTask('app:release', 'Build release javascript application.', ['requirejs:release', 'concat:release']);

    grunt.registerTask('style:dev', 'Build release style application.', []);
    grunt.registerTask('style:release', 'Build release style application.', []);

    grunt.registerTask('build:release', 'Build release package.', ['app:release', 'style:release']);
    grunt.registerTask('build:dev', 'Build release code.', ['app:dev', 'style:dev']);

    grunt.registerTask('dev', 'Start development environment.', ['build:dev', 'concurrent:dev']);

    grunt.registerTask('release', 'Create a release package, ready to deploy', ['build:release']);

    grunt.registerTask('default', ['dev']);
};

// Create a connect middleware to serve contnent of
// public directory.
function publicDir(connect) {
    return connect.static('public');
}

// Create a connect middleware to serve `src`
function jsSourcesDir(connect) {
    var server = connect.createServer();
    server.use('/js', connect.static('src'));
    return server;
}

function vendorsDir(connect) {
    var server = connect.createServer();
    server.use('/bower_components', connect.static('bower_components'));
    return server;
}

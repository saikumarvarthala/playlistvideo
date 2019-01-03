const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const MongoosePlugin = require('../plugins/mongoose.plugin');
// const ToolModule = require('../modules/tool/tool.module');
const VideoModule = require('../modules/video/video.module');
const PlaylistModule = require('../modules/playlist/playlist.module');
const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{log: '*', response: '*'}]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['awesome_log']
        }]

    }
};
module.exports = [
    {
        register: MongoosePlugin,
        options: {
            mongoDbUri:'mongodb://root:root12@ds147734.mlab.com:47734/interview'
        }
    },
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: {
            info: {
                title: 'API Documentation',
                version: '0.0.1'
            }
        }
    },
    require('hapi-auth-jwt2'),
    {
        register: require('good'),
        options: goodOptions
    },
    // ToolModule
    VideoModule,
    PlaylistModule
];
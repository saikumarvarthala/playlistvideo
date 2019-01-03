const videoRoutes = require('./video.routes');
const VideoModule = {
    register: (server, options, next) => {
        server.route(videoRoutes);
        next();
    }
};
//plugins
VideoModule.register.attributes = {
    name: 'VideoModule',
    pkg: require('../../package.json')
};

module.exports = VideoModule;
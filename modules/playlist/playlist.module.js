const playlistRoutes = require('./playlist.routes');
const PlaylistModule = {
    register: (server, options, next) => {
        server.route(playlistRoutes);
        next();
    }
};
//plugins
PlaylistModule.register.attributes = {
    name: 'PlaylistModule',
    pkg: require('../../package.json')
};

module.exports = PlaylistModule;
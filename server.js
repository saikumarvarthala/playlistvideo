const hapi = require('hapi');
const server = new hapi.Server();
const plugins = require('./config/plugins');
const JwtService = require('./services/jwt.service');
const config = require('./config/development');
server.connection({host: config.host, port: config.port,routes: { cors: true }});

server.register(plugins, (err) => {
    if (err) {
        throw err;
    }
    server.start(err => {
        if (err) {
            throw err;
        }
        // RS256 HS256
        server.auth.strategy('jwt','jwt',{
           key: config.secret,
           verifyOptions:{
               algorithm: ['HS256']
           },
           validateFunc: JwtService.validate
        });
        server.auth.default('jwt');
        console.log(`Server Running at PORT ${server.info.port}`);
    });
});
var ip = require("ip");
console.log('IP Address Is...'+ ip.address() );
module.exports = {
   host:ip.address()?ip.address():"0.0.0.0",
   port: process.env.PORT ||'3000',
   secret: '12333KEY'
};
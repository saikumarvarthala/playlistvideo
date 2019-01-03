const Video = require('./video.model');
const Playlist = require('../playlist/playlist.model');
module.exports = {
    async create(req, reply) {
        try {
            var exist=await Playlist.findById(req.payload.playlistId)
            if(exist=={}||exist==null){
                reply.response({message:"Send existing playlistId",response_code:400});
            }
            else{
                let videoPayload={
                    playlistId  : req.payload.playlistId,
                    title       : req.payload.title,
                    thumbnailUrl: req.payload.thumbnailUrl,
                    videoUrl    : req.payload.videoUrl,
                    duration    : req.payload.duration
                }
                const video=new Video(videoPayload);
                await video.save();
                return reply.response({message:'video data added.',response_code:200});
            }            
        }
        catch(err){
            console.log("errrr"+JSON.stringify(err));
            reply.response({message:"Error occur",response_code:500})
        }
    },
    async show(req, reply) {
        try {
            var video = await Video.findById(req.params.id);
            return reply.response(video);
        }
        catch(err){
            throw err;
        }
    },
    async videoByPlaylistId(req, reply) {
        try {
            var video = await Video.find({playlistId:req.params.id});
            return reply.response(video);
        }
        catch(err){
            throw err;
        }
    },
    async index(req, reply) {
        try {
            const video = await Video.find({});
            return reply.response(video);
        }
        catch(err){
            throw err;
        }
    },
    async delete(req, reply) {
        try {
            const user = await Video.findByIdAndRemove(req.params.id);
            if(!user){
                return reply.response({message:"No id found.",response_code:200});
            }
            else{
                return reply.response({message:"Data deleted successfully.",response_code:200});
            }
        }
        catch(err){
            throw err;
        }
    },
    async upsert(req, reply) {
        try {
            const user = await Tool.findByIdAndUpdate(req.params.id,req.payload,{new:true});
            if(!user){
                return reply.response({message:"No id found.",response_code:200});
            }
            else{
                return reply.response({message:"Data updated successfully.",response_code:200});
            }
        }
        catch(err){
            throw err;
        }
    },
    async shuffle(req, reply) {
        try {
            Video.find({}).exec(function(err, array) {
                if(err){
                    reply.response({message:"error occured.",response_code:500});
                }
                else{
                    var currentIndex = array.length, temporaryValue, randomIndex;
                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return reply.response(array);
                }
            });
        }
        catch(err){
            throw err;
        }
    },
}
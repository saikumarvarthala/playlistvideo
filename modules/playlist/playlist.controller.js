const Playlist = require('./playlist.model');
const Video = require('../video/video.model');
module.exports = {
    async create(req, reply) {
        try {
            var playlistPayload={
                name        : req.payload.name,
                websiteUrl  : req.payload.websiteUrl
            }
            const playlist = await Playlist.create(playlistPayload);
            if(req.payload.videoUrl.length==0){
                return reply.response({message:"data has been saved successfully.",response_code:200});
            }
            let arr=[];
            for(let i=0;i<req.payload.videoUrl.length;i++){
                let videoPayload={
                    playlistId  : playlist.id,
                    title       : req.payload.videoUrl[i].title,
                    thumbnailUrl: req.payload.videoUrl[i].thumbnailUrl,
                    videoUrl    : req.payload.videoUrl[i].videoUrl,
                    duration    : req.payload.videoUrl[i].duration,
                    createdAt   : Date.now()
                }
                arr.push(videoPayload);
                if(arr.length==req.payload.videoUrl.length){
                    await Video.create(arr,function(err){
                        if(err){
                            console.log(JSON.stringify(err));
                        }
                        return reply.response({message:'data has been saved successfully.',response_code:200});
                    });
                }
            }
        }
        catch(err){
            reply.response({message:"Error occur",response_code:500})
        }
    },
    async show(req, reply) {
        try {
            const playlist = await Playlist.findById(req.params.id);
            if(!playlist){
                return reply.response({});
            }
            return reply.response(playlist);
        }
        catch(err){
            throw err;
        }
    },
    async shuffle(req, reply) {
        try {
            Playlist.find({}).exec(function(err, array) {
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
                    reply.response(array);
                }
            });
            
        }
        catch(err){
            throw err;
        }
    },
    async index(req, reply) {
        try {
        const playlist = await Playlist.find({});
            return reply.response(playlist);    
        }
        catch(err){
            throw err;
        }
    },
    async delete(req, reply) {
        try {
            await Playlist.findByIdAndRemove(req.params.id);
            await Video.find({playlistId:req.params.id}).remove();
            return reply.response({message:"playlist and data related to playlist has been deleted successfully."});
        }
        catch(err){
            throw err;
        }
    },
    // async upsert(req, reply) {
    //     try {
    //         const playlist = await Playlist.findByIdAndUpdate(req.params.id,req.payload,{new:true});
    //         if(!user){
    //             return reply.response({message:"No id found.",response_code:200});
    //         }
    //         else{
    //             return reply.response({message:"Data updated successfully.",response_code:200});
    //         }
    //     }
    //     catch(err){
    //         throw err;
    //     }
    // }
    
}
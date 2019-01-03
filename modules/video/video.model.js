const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    playlistId:{
        type: Schema.ObjectId,
        ref: 'Playlist'
    },
    title:{
        type:String
    },
    thumbnailUrl:{
        type:String
    },
    videoUrl:{
        type:String
    },
    duration:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
},{
    versionKey: false
});


module.exports = mongoose.model('Video', VideoSchema);
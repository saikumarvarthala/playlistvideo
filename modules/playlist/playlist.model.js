const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name:{
        type:String
    },
    websiteUrl:{
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


module.exports = mongoose.model('Playlist', PlaylistSchema);
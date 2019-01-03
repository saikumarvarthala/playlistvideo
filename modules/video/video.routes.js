const VideoController = require('./video.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/videos',
        method: 'POST',
        config: {
            handler: VideoController.create,
            validate: {
                payload:{
                    playlistId  : Joi.string().required(),
                    title       : Joi.string().required(),
                    thumbnailUrl: Joi.string().required(),
                    videoUrl    : Joi.string().required(),
                    duration    : Joi.string().required(),

                }
            },
            description: 'playlist can create new Account',
            tags: ['api','Playlists'],
            notes: 'Returns a signup response',
            auth: false
        }
    },
    {
        path: '/videos/{id}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            handler: VideoController.show,
            tags: ['api','videos'],
            description: 'Find video By token',
            notes: 'Returns a single video',
            auth:false
        }
    },
    {
        path: '/videos/playlist/{id}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            handler: VideoController.videoByPlaylistId,
            tags: ['api','videos'],
            description: 'Find video By token',
            notes: 'Returns a single video',
            auth:false
        }
    },
    {
        path: '/videos',
        method: 'GET',
        config: {
            handler: VideoController.index,
            tags: ['api','videos'],
            description: 'Find video By token',
            notes: 'Returns a single video',
            auth:false
        }
    },
    {
        path: '/videos/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            handler: VideoController.delete,
            tags: ['api','videos'],
            description: 'Find video By token',
            notes: 'Returns a single video',
            auth:false
        }
    },
    {
        path: '/videos/update/{id}',
        method: 'PUT',
        config: {
            handler: VideoController.upsert,
            validate: {
                params:Joi.object().keys({
                    id:Joi.string().required(),
                }),
                payload: Joi.object().keys({
                    
                })
            },
            description: 'video can update existing Account',
            tags: ['api','videos'],
            notes: 'Returns a updated response',
            auth: false
        }
    },
    {
        path: '/videos/shuffle',
        method: 'GET',
        config: {
            handler: VideoController.shuffle,
            tags: ['api','videos'],
            description: 'Find video By token',
            notes: 'Returns a single video',
            auth:false
        }
    },
];

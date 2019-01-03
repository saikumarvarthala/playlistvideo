const PlaylistController = require('./playlist.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/playlists',
        method: 'POST',
        config: {
            handler: PlaylistController.create,
            validate: {
                payload:{
                    name        : Joi.string().required(),
                    websiteUrl  : Joi.string().required(),
                    videoUrl    : Joi.array().items({
                        title       : Joi.string().required(),
                        thumbnailUrl: Joi.string().required(),
                        videoUrl    : Joi.string().required(),
                        duration    : Joi.string().required()
                    })
                }
            },
            description: 'playlist can create new Account',
            tags: ['api','Playlists'],
            notes: 'Returns a signup response',
            auth: false
        }
    },
    {
        path: '/playlists/{id}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            handler: PlaylistController.show,
            tags: ['api','playlists'],
            description: 'Find playlist By token',
            notes: 'Returns a single playlist',
            auth:false
        }
    },
    {
        path: '/playlists',
        method: 'GET',
        config: {
            handler: PlaylistController.index,
            tags: ['api','playlists'],
            description: 'Find playlist By token',
            notes: 'Returns a single playlist',
            auth:false
        }
    },
    {
        path: '/playlists/shuffle',
        method: 'GET',
        config: {
            handler: PlaylistController.shuffle,
            tags: ['api','playlists'],
            description: 'Find playlist By token',
            notes: 'Returns a single playlist',
            auth:false
        }
    },
    {
        path: '/playlists/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            handler: PlaylistController.delete,
            tags: ['api','playlists'],
            description: 'Find playlist By token',
            notes: 'Returns a single playlist',
            auth:false
        }
    },
    // {
    //     path: '/playlists/update/{id}',
    //     method: 'PUT',
    //     config: {
    //         handler: PlaylistController.upsert,
    //         validate: {
    //             params:Joi.object().keys({
    //                 id:Joi.string().required(),
    //             }),
    //             payload: Joi.object().keys({
    //             })
    //         },
    //         description: 'Tool can update existing Account',
    //         tags: ['api','playlists'],
    //         notes: 'Returns a updated response',
    //         auth: false
    //     }
    // },
];

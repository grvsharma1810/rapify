import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

import { dummyChannelData } from './channel-data';
import { dummyPlaylistData } from './playlist-data';
import { dummyVideoData } from './video-data';

export default function mockServer() {
    createServer({
        serializers: {
            application: RestSerializer
        },

        models: {
            channelItem: Model,
            playlistItem: Model,
            videoItem: Model,
            playlistVideoItem: Model
        },

        routes() {
            this.namespace = "api";
            this.timing = 1000;

            /*---------CHANNEL ROUTES----------*/
            this.get("/channel", (schema) => {
                return schema.channelItems.all();
            });
            this.get("/channel/:id", (schema, request) => {
                let id = request.params.id;
                return schema.channelItems.find(id)
            });
            this.post("/channel", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.channelItems.create({
                    ...attrs,
                });
            });
            this.patch("/channel/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.channelItems.find(id).update(attrs)
            });
            this.delete("/channel/:id", (schema, request) => {
                let id = request.params.id;
                return schema.channelItems.find(id).destroy();
            });

            /*---------WATCH ROUTES----------*/
            this.get("/watch", (schema) => {
                return schema.videoItems.all();
            });
            this.get("/watch/:id", (schema, request) => {
                let id = request.params.id;
                return schema.videoItems.find(id)
            });
            this.post("/watch", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.videoItems.create({
                    ...attrs,
                });
            });
            this.patch("/watch/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.videoItems.find(id).update(attrs)
            });
            this.delete("/watch/:id", (schema, request) => {
                let id = request.params.id;
                return schema.videoItems.find(id).destroy();
            });

            /*---------PLAYLIST ROUTES----------*/
            this.get("/playlist", (schema) => {
                return schema.playlistItems.all();
            });
            this.get("/playlist/:id", (schema, request) => {
                let id = request.params.id;
                return schema.playlistItems.find(id)
            });
            this.post("/playlist", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.playlistItems.create({
                    ...attrs,
                });
            });
            this.patch("/playlist/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.playlistItems.find(id).update(attrs)
            });
            this.delete("/playlist/:id", (schema, request) => {
                let id = request.params.id;
                return schema.playlistItems.find(id).destroy();
            });


            /*---------PLAYLIST VIDEO ROUTES----------*/
            this.get("/playlist-video", (schema) => {
                return schema.playlistVideoItems.all();
            });
            this.get("/playlist-video/:id", (schema, request) => {
                let id = request.params.id;
                return schema.playlistVideoItems.find(id)
            });
            this.post("/playlist-video", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.playlistVideoItems.create({
                    ...attrs,
                });
            });
            this.patch("/playlist-video/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.playlistVideoItems.find(id).update(attrs)
            });
            this.delete("/playlist-video/:id", (schema, request) => {
                let id = request.params.id;
                return schema.playlistVideoItems.find(id).destroy();
            });
        },

        seeds(server) {
            dummyChannelData.forEach((channel) => {
                server.create("channelItem", {
                    ...channel
                });
            });

            dummyPlaylistData.forEach((playlist) => {
                server.create("playlistItem", {
                    ...playlist
                });
            });

            dummyVideoData.forEach((video) => {
                server.create("videoItem", {
                    ...video
                });
            });
        }
    });
}

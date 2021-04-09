import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

import { dummyUserData } from './user-data';
import { dummyPlaylistData } from './playlist-data';
import { dummyVideoData } from './video-data';

export default function mockServer() {
    createServer({
        serializers: {
            application: RestSerializer
        },

        models: {
            userItem: Model,
            playlistItem: Model,
            videoItem: Model,
            playlistVideoItem: Model
        },

        routes() {
            this.namespace = "api";
            this.timing = 1000;

            /*---------USER ROUTES----------*/
            this.get("/user", (schema) => {
                return schema.userItems.all();
            });
            this.get("/user/:id", (schema, request) => {
                let id = request.params.id;
                return schema.userItems.find(id)
            });
            this.post("/user", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.userItems.create({
                    ...attrs,
                });
            });
            this.patch("/user/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.userItems.find(id).update(attrs)
            });
            this.delete("/user/:id", (schema, request) => {
                let id = request.params.id;
                return schema.userItems.find(id).destroy();
            });

            /*---------VIDEO ROUTES----------*/
            this.get("/video", (schema) => {
                return schema.videoItems.all();
            });
            this.get("/video/:id", (schema, request) => {
                let id = request.params.id;
                return schema.videoItems.find(id)
            });
            this.post("/video", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.videoItems.create({
                    ...attrs,
                });
            });
            this.patch("/video/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.videoItems.find(id).update(attrs)
            });
            this.delete("/video/:id", (schema, request) => {
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
            this.get("/playlistVideo", (schema) => {
                return schema.playlistVideoItems.all();
            });
            this.get("/playlistVideo/:id", (schema, request) => {
                let id = request.params.id;
                return schema.playlistVideoItems.find(id)
            });
            this.post("/playlistVideo", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.playlistVideoItems.create({
                    ...attrs,
                });
            });
            this.patch("/playlistVideo/:id", (schema, request) => {
                let id = request.params.id
                let attrs = JSON.parse(request.requestBody);
                return schema.playlistVideoItems.find(id).update(attrs)
            });
            this.delete("/playlistVideo/:id", (schema, request) => {
                let id = request.params.id;
                return schema.playlistVideoItems.find(id).destroy();
            });
        },

        seeds(server) {
            dummyUserData.forEach((user) => {
                server.create("userItem", {
                    ...user
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

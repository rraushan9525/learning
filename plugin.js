import * as handler from "../handler/index.js"

export const routes = {
    name: "routes",
    version: "1.0.0",
    register: async (server) => {
        console.log("Registering routesPlugin...")
        server.route({
            method: "GET",
            path: "/api/contacts",
            handler: handler.handler
            // (request, h) => {
            //     return { message: "Test" }
            // }
        })
        server.route({
            method: "*",
            path: "/{any*}",
            handler: (request, h) => {
                return h.response("Page not found").code(404);
            },
        });
    }
}
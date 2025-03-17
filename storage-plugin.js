import * as blobStorageClient from "./storage.js"

export const blobStoragePlugin = {
    name: "storagePlugin",
    version: "1.0.0",
    register: async(server) => {
        console.log("Registering blobStoragePlugin...")

        server.decorate("server", "blobStorageClient", blobStorageClient)
    }
}
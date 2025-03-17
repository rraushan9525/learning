import dotEnv from "dotenv"
import { BlobServiceClient, generateBlobSASQueryParameters, ContainerSASPermissions, SASProtocol } from "@azure/storage-blob"

dotEnv.config()

export const getReadUrl = async(fileName) => {
    console.log("Blob storage getReadUrl...")

    const blobName = `documents/${fileName}`
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
    const containerName = process.env.AZURE_STORAGE_CONTAINER

    console.log("Generating signed url...")
    const blobServiceClient = connectionString && BlobServiceClient.fromConnectionString(connectionString)
    const containerClient = containerName && blobServiceClient.getContainerClient(containerName)
    const blobClient = containerClient.getBlobClient(blobName)

    const containerSAS = generateBlobSASQueryParameters({
        containerName, // Required
        permissions: ContainerSASPermissions.parse("r"), // Required
        startsOn: new Date(), // Optional
        expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // Required. Date type
        // ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
        protocol: SASProtocol.Https, // Optional
        // version: "2016-05-31" // Optional
    },
        blobServiceClient.credential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
    ).toString();
    const sasUrl = `${blobClient.url}?${containerSAS}`

    console.log("Signed url generated successfully...")
    return sasUrl
}

export const uploadBlob = async(fileName, data) => {
    console.log("Blob storage uploadBlob...")

    const blobName = `documents/${fileName}`
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
    const containerName = process.env.AZURE_STORAGE_CONTAINER

    const blobServiceClient = connectionString && BlobServiceClient.fromConnectionString(connectionString)
    const containerClient = containerName && blobServiceClient.getContainerClient(containerName)
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const response = await blockBlobClient.upload(data, data?.length)
    return response
}
export const handler = async (req, h) => {
    const db = req?.server?.databaseManager()
    const blobStorageClient = req?.server?.blobStorageClient
    // const transaction = db()
    // const result = await transaction.query("SELECT current_database()")
    // const client = await db.connect()
    await db.query("BEGIN")
    const result = await db.query("SELECT current_database()")
    const result1 = await db.query("CREATE TABLE IF NOT EXISTS tenants123(name varchar(255), des varchar(255))")
    await db.query("COMMIT")
    const response = await blobStorageClient.getReadUrl("Findings_2025-01-03T14_40_05.xlsx")
    
    // await client.release()
    return { message: response }
}
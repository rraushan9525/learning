import amqp from "amqplib"
import dotEnv from "dotenv"
dotEnv.config()

const queueName = "common-service-queue"

export const consume = async() => {
    console.log("Starting rabbitMQ consumer...")

    const connection = await amqp.connect(
        `amqp://${process.env.RABBIT_MQ_USERNAME}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}`
    )
    console.log("Connected to rabbitMQ...Creating channel...")

    const channel = await connection.createChannel()
    console.log(`Channel created...${queueName} consumer is waiting for message...`)

    channel.prefetch(1)
    channel.consume(queueName, async(msg) => {
        const messageContent = msg.content.toString()
        console.log("Message received...")
        console.log(messageContent)

        await channel.ack(msg)
        await channel.sendToQueue("via-ack-queue", Buffer.from("abc"))
    })
}
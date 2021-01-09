const { decryptMedia } = require('@open-wa/wa-automate')

class Convert {

    async imageToSticker(client, message) {
        const { from, sender, mimetype } = message

        // Message confirming receipt of the image 
        await client.sendText(from, `${sender.pushname}, aguarde um pouco enquanto sua figurinha é gerada.`)

        // Decrypting message
        const media = await decryptMedia(message)

        // Converting to base64
        let base64 = media.toString('base64')

        // Re-sending to user in sticker format
        await client.sendImageAsSticker(from, `data:${mimetype};base64,${base64}`)

        // Last message
        await client.sendText(from, `${sender.pushname}, figurinha gerada com sucesso! :)`)
    }

    async videoToSticker(client, message) {
        const { from, sender, mimetype } = message

        // Message confirming receipt of the video 
        await client.sendText(from, `${sender.pushname}, aguarde um pouco enquanto sua figurinha é gerada.`)

        // Decrypting message
        const media = await decryptMedia(message)

        // Converting to base64
        let base64 = media.toString('base64')

        // Re-sending to user in sticker (gif) format
        await client.sendMp4AsSticker(from, `data:${mimetype};base64,${base64}`)

        // Last message
        await client.sendText(from, `${sender.pushname}, figurinha animada gerada com sucesso! :)`)
    }
}

module.exports = new Convert()
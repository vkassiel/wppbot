const { decryptMedia } = require('@open-wa/wa-automate')

class Convert {

    async imageToSticker(client, message) {

        const { from, sender, mimetype } = message

        await client.sendText(from, `${sender.pushname}, aguarde um pouco enquanto sua figurinha é gerada.`)

        const media = await decryptMedia(message)
        let base64 = media.toString('base64')

        await client.sendImageAsSticker(from, `data:${mimetype};base64,${base64}`)

        await cliend.sendText(from, `${sender.pushname}, figurinha gerada com sucesso! :)`)
    }
}

module.exports = new Convert()
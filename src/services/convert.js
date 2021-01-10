const { decryptMedia } = require('@open-wa/wa-automate')

class Convert {

    async imageToSticker(client, message) {
        const { from, sender, mimetype, chat, type } = message

        if(type != 'image'){
            await client.reply(chat.id, `${sender.pushname}, com o *!sticker* você converte IMAGEM em STICKER. Para vídeos ou gifs, tente o comando *!gif*`, message.id, false)
        }else{
            // Message confirming receipt of the image 
            await client.reply(chat.id, `${sender.pushname}, aguarde um pouco enquanto sua figurinha é gerada.`, message.id, false)
    
            // Decrypting message
            const media = await decryptMedia(message)
    
            // Converting to base64
            let base64 = media.toString('base64')
    
            // Re-sending to user in sticker format
            await client.sendImageAsSticker(from, `data:${mimetype};base64,${base64}`)  
        }


    }

    async videoToSticker(client, message) {
        const { from, sender, mimetype, chat } = message

        // Message confirming receipt of the video 
        await client.reply(chat.id, `${sender.pushname}, aguarde um pouco enquanto sua figurinha é gerada.`, message.id, false)

        // Decrypting message
        const media = await decryptMedia(message)

        // Converting to base64
        let base64 = media.toString('base64')

        // Re-sending to user in sticker (gif) format
        await client.sendMp4AsSticker(from, `data:${mimetype};base64,${base64}`)
    }
}

module.exports = new Convert()
/* const { reply } = require('@open-wa/wa-automate') */
class Help {

    async commands(client, message) {
        const { from, sender, mimetype, chat } = message

        await client.reply(chat.id, `${sender.pushname}, abaixo segue minha lista de comandos:`, message.id, false)
        await client.sendText(from, "- Envie uma imagem com *!sticker* na legenda e ela virará um sticker! \n- Envie um vídeo com *!gif* na legenda e ele virará um sticker gif!")
        await client.sendText(from, "Comandos para gerar gif e sticker só funcionam no meu privado.")
        await client.sendText(from, "Outros comandos: !cuckavid, !pretume, !dinogordo")
    }
}

module.exports = new Help()
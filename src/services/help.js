class Help {

    async commands(client, message) {
        const { from, sender, mimetype, chat } = message

        // Quote command
        await client.reply(chat.id, `${sender.pushname}, abaixo segue minha lista de comandos:`, message.id, false)

        // Commands list
        const commands =
`Lista de comandos disponíveis:

*!sticker*
Cria um sticker a partir de uma imagem.

*!gif*
Cria um sticker animado a partir de um gif ou de um vídeo.

*!everyone*
Marca todos os participantes de um grupo.

Outros comandos:
*!cuckavid*
*!pretume*
*!solivinha*`

        // Sending command list to user or group
        await client.sendText(from, commands)
    }

    async everyone(client, message) {
        const { chat } = message

        // Capturing the participants list
        const participants = chat.groupMetadata.participants

        for (let i = 0; i < participants.length; i++) {
            // Defining the id
            var ParticipantId = participants[i].id

            // Getting details based on id
            var ParticipantDetails = await client.getContact(ParticipantId)

            // Getting the number (unique user id) before '@'
            var ParticipantNumber = ParticipantDetails.id.split('@')

            // Flooding
            await client.sendTextWithMentions(chat.id, `@${ParticipantNumber[0]}`)
        }
    }
}

module.exports = new Help()
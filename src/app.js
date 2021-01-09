const { create } = require('@open-wa/wa-automate')

// Importing services
const convert = require('./services/convert')

const app = create()
app.then(client => start(client))

function start(client) {
    client.onMessage(async (message) => {

        const { isMedia, isGroupMsg, caption } = message

        const commands = {
            sticker: () => {
                convert.imageToSticker(client, message)
            },
            gif: () => {
                convert.videoToSticker(client, message)
            }
        }

        if (!isGroupMsg && isMedia) {
            switch (caption) {
                case '!sticker':
                    var runCommand = commands["sticker"]
                    runCommand()
                    break

                case '!gif':
                    var runCommand = commands["gif"]
                    runCommand()
                    break
            }
        } else {
            await client.sendText(message.from, "Desculpe, ocorreu um erro inesperado. Tente novamente mais tarde!")
        }

    })
}
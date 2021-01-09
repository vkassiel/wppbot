const { create } = require('@open-wa/wa-automate')

// Importing services
const convert = require('./services/convert')
const help = require('./services/help')

const app = create()
app.then(client => start(client))

function start(client) {
    client.onMessage(async (message) => {

        const { caption, body } = message

        const commands = {
            sticker: () => {
                convert.imageToSticker(client, message)
            },
            gif: () => {
                convert.videoToSticker(client, message)
            },
            commands: () => {
                help.commands(client, message)
            }
        }

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

        switch (body) {
            case '!commands':
                var runCommand = commands["commands"]
                runCommand()
                break
        }
    })
}
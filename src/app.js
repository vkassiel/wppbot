const { create } = require('@open-wa/wa-automate')
const imageToBase64 = require('image-to-base64')

// Importing services
const convert = require('./services/convert')
const help = require('./services/help')

const app = create()
app.then(client => start(client))

function start(client) {
    client.onMessage(async (message) => {

        const { caption, body, chat, from } = message

        const commands = {
            sticker: () => {
                convert.imageToSticker(client, message)
            },
            gif: () => {
                convert.videoToSticker(client, message)
            },
            // Send the command list
            commands: () => {
                help.commands(client, message)
            },
            // Quote all participants of the group
            everyone: () => {
                help.everyone(client, message)
            }
        }

        // If command is on the media caption
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

        // If command is a normal message
        switch (body) {
            case '!commands':
                var runCommand = commands["commands"]
                runCommand()
                break

            // Send the description of group
            case '!desc':
                await client.reply(chat.id, chat.groupMetadata.desc, message.id, false)
                break

            case '!everyone':
                var runCommand = commands["everyone"]
                runCommand()
                break 
        }
    })
}
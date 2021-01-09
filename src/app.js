const { create } = require('@open-wa/wa-automate')

const app = create()
app.then(client => start(client))

function start(client) {
    client.onMessage(async (message) => {

        await client.sendText(message.from, "Hello!")

    })
}
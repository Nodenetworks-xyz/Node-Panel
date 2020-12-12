const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')
// Connect to mongo
const mongo = require('./mongo')
// Handler made by Alexander at wornoffkeys.com or youtube.com/wornoffkeys
client.on('ready', async () => {
  console.log('The client is ready!')

  await mongo().then((mongoose) => {
    try {
      console.log('Connected to mongo!')
    } finally {
      mongoose.connection.close()
    }
  })
  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/command-base`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }
  readCommands('commands')
})
    


client.login(token)
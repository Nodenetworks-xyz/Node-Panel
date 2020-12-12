// Requires and Libraries
const mongo = require('../../mongo')
const loginSchema = require('../../schemas/login-schema')
const { prefix } = require('../../config.json')
// Actual command
const fs = require('fs')
const path = require('path');
module.exports = {
  commands: 'stop',
  callback: async (message) => {
    if(message.channel.type === 'text') return message.channel.send("Please use this command in DMS")

    const loginuser = message.author
    var args = message.content.substring(prefix.length).split(" ");
    const directory = args[1]
    await mongo().then(async (mongoose) => {
      try {
        const result = await loginSchema.findOne(
          {
            _id: loginuser.id,
          },
        )
        console.log(`${args[1]}`)
        console.log(`${result.directory}`)
      if(!result) return message.channel.send("You are not a registered user if you feel this a mistake please contact administration.")
      const logincheck = result.loginactive === true
      if(!logincheck) return message.channel.send("You are not logged in please login with -login")
      if(result) {
        
        message.channel.send(`Stopping bot proccess...`)
        message.channel.send(`Successfully stopped bot proccess ${result.mainfile}`)

  }
      } finally {
        mongoose.connection.close()
      }
    })
    
  },
}



// Requires and Libraries
const mongo = require('../../mongo')
const loginSchema = require('../../schemas/panelschema')
const { prefix } = require('../../config.json')
const fs = require('fs')
const path = require('path');
// Actual command
module.exports = {
  commands: ['createdir','mkdir'],
  minArgs: 1,
  expectedArgs: "<direcotry name>",
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
        
        message.channel.send(`Making directory...`)
        fs.mkdir(path.join(__dirname,`${result.directory}`,`${args[1]}`), (err) => { 
        message.channel.send(`Successfully made directory ${args[1]}`)
        if(err) {
          message.channel.send(err)
        }
    })
  }
      } finally {
        mongoose.connection.close()
      }
    })
    
  },
}



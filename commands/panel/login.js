// Requires and Libraries
const mongo = require('../../mongo')
const loginSchema = require('../../schemas/panelschema')
const { prefix } = require('../../config.json')
// Actual command
module.exports = {
  commands: 'login',
  minArgs: 1,
  expectedArgs: "<Unique Identifier>",
  callback: async (message) => {
    if(message.channel.type === 'text') {
      return message.channel.send("Please use this command in DMS"), message.delete()
    }

    const loginuser = message.author
    const userId = loginuser.id
    var args = message.content.substring(prefix.length).split(" ");
    const uid = args[2]
    await mongo().then(async (mongoose) => {
      try {
        const result = await loginSchema.findOne(
          {
            _id: loginuser.id,
          },
        )
      if(!result) return message.channel.send("You are not a registered user if you feel this a mistake please contact administration.")
      const uidcheck = result.uniqueid === args[1]
      if(!uidcheck) return message.channel.send("Incorrect unique identifier provided")
      if(result) {
        message.channel.send(`Logged in as ${message.author}`)
        await loginSchema.findOneAndUpdate({
          _id: loginuser.id
}, {
          loginactive: true

      
}, {
        upsert: true , // insert and update 
        new: true // returns the latest value 
})
      }
      } finally {
        mongoose.connection.close()
      }
    })
    
  },
}



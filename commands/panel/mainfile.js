const mongo = require('../../mongo')
const loginSchema = require('../../schemas/login-schema')
const { prefix } = require('../../config.json')
module.exports = {
  commands: 'mainfile',
  minArgs: 1,
  expectedArgs: "<filename>",
  callback: async (message) => {
    if(message.channel.type === 'text') return message.channel.send("Please use this command in DMS")

    const loginuser = message.author
    var args = message.content.substring(prefix.length).split(" ");
    const file = args[1]
    await mongo().then(async (mongoose) => {
      try {
        const result = await loginSchema.findOne(
          {
            _id: loginuser.id,
          },
        )
      if(!result) return message.channel.send("You are not a registered user if you feel this a mistake please contact administration.")
      const logincheck = result.loginactive === true
      if(!logincheck) return message.channel.send("You are not logged in please login with -login")
      if(result) {
          const same = result.mainfile === args[1]
        if(same) return message.channel.send(`Bot mainfile is already ${args[1]}`)
        
        message.channel.send(`Changing mainfile...`)
        message.channel.send(`Successfully changed mainfile to ${args[1]}`)
        await loginSchema.findOneAndUpdate({
          _id: loginuser.id
}, {
          mainfile: args[1]
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



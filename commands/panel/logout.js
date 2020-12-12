const mongo = require('../../mongo')
const loginSchema = require('../../schemas/login-schema')
const { prefix } = require('../../config.json')
module.exports = {
  commands: 'logout',
  callback: async (message) => {
    if(message.channel.type === 'text') return message.channel.send("Please use this command in DMS")

    const loginuser = message.author
    const userId = loginuser.id
    var args = message.content.substring(prefix.length).split(" ");
    await mongo().then(async (mongoose) => {
      try {
        const result = await loginSchema.findOne(
          {
            _id: loginuser.id,
          },
          {
            loginactive: true
          }
        )
      if(!result) {
        message.channel.send("You are not a registered user if you feel this a mistake please contact administration.")
      }
      if(result) {
        await loginSchema.findOneAndUpdate({
          _id: loginuser.id
}, {
          loginactive: false

      
}, {
        upsert: true , // insert and update 
        new: true // returns the latest value 
})

        message.channel.send(`Logged out`)
      }
      } finally {
        mongoose.connection.close()
      }
    })
    
  },
}



// Requires and Libraries
const mongo = require('../../mongo')
const loginSchema = require('../../schemas/login-schema')
const { prefix } = require('../../config.json')
module.exports = {
  commands: 'register',
  minArgs: 3,
  expectedArgs: "<User you want registered> <uniqueid> <directory>",
  callback: async (message) => {
    if (message.author != '645622614248652801') return
    message.channel.send("User has been registered")
    const registeruser = message.mentions.users.first()
    const userId = registeruser.id
    var args = message.content.substring(prefix.length).split(" ");

    await mongo().then(async (mongoose) => {
      try {
        await loginSchema.findOneAndUpdate(
            {
                _id: userId
            },
            {
              userId,
              uniqueid: args[2],
              directory: args[3]
            },
            
            {
              upsert: true,
            }
          )
        } finally {
          mongoose.connection.close()
        }
      })
    },
  }
  



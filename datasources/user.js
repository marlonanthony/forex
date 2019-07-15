const { DataSource } = require('apollo-datasource')
const { UserInputError } = require('apollo-server-express')
const isEmail = require('isemail')
const bcrypt = require('bcryptjs')

const User = require('../models/User') 

class UserAPI extends DataSource {
  constructor() {
    super()
  }

  // initialize(config) {
  //   this.context = config.context
  // }

  async createNewUser({ email, password, name }) {
    try {
      if(!isEmail.validate(email)) { throw new UserInputError('Invalide Email') }
      const existingUser = await User.findOne({ email })
      if(existingUser) { throw new UserInputError('User already exists') }
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await new User({
        name,
        email,
        password: hashedPassword
      })
      await user.save()
      return true 
    } catch (error) { throw error }
  }
}

module.exports = UserAPI
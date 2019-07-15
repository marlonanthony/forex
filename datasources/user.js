const { DataSource } = require('apollo-datasource')
const { UserInputError } = require('apollo-server-express')
const isEmail = require('isemail')
const bcrypt = require('bcryptjs')

const User = require('../models/User') 
const Pair = require('../models/Pair')

class UserAPI extends DataSource {
  constructor() {
    super()
  }

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

  async loginUser({ email, password, req }) {
    try {
      if (!isEmail.validate(email)) { throw new UserInputError('Invalide Email') }
      const user = await User.findOne({ email }) 
      if(!user) { throw new UserInputError('Email or password is incorrect!') }
      const isEqual = await bcrypt.compare(password, user.password)
      if(!isEqual) { throw new UserInputError('Email or password is incorrect!') }
      req.session.userId = user.id 
      return user 
    } catch (error) { throw error }
  }

  async getMe({ req }) {
    try {
      if(!req.session.userId) return null 
      const user = await User.findById(req.session.userId).populate('pairs') 
      return user 
    } catch (error) { throw error }
  }
}

module.exports = UserAPI
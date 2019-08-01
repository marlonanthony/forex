const { DataSource } = require('apollo-datasource')
const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server-express')
const isEmail = require('isemail')
const bcrypt = require('bcryptjs')

const User = require('../models/User') 
const Pair = require('../models/Pair')

class UserAPI extends DataSource {

  initialize(config) {
    this.context = config.context
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

  async loginUser({ email, password }) {
    try {
      if (!isEmail.validate(email)) { throw new UserInputError('Invalide Email') }
      const user = await User.findOne({ email }) 
      if(!user) { throw new UserInputError('Email or password is incorrect!') }
      const isEqual = await bcrypt.compare(password, user.password)
      if(!isEqual) { throw new UserInputError('Email or password is incorrect!') }
      this.context.req.session.userId = user.id 
      return user 
    } catch (error) { throw error }
  }

  async getMe() {
    try {
      if(!this.context.req.session.userId) return null 
      const user = await User.findById(this.context.req.session.userId)
      return user 
    } catch (error) { throw error }
  }

  async newPosition({ pair, lotSize, openedAt, position }) {
    try {
      const user = await User.findById(this.context.req.session.userId)
      if(!user) throw new AuthenticationError('Invalide Credentials!')
      if(user.bankroll < lotSize) throw new ForbiddenError('Insufficient funds!')
      
      const newPair = new Pair({
        pair,
        lotSize,
        openedAt,
        position,
        open: true,
        user: this.context.req.session.userId
      })
      const pairResult = await newPair.save()
      user.pairs.unshift(pairResult)
      user.bankroll -= lotSize
      await user.save()
      const message = `Congrats ${user.name}! You've opened a ${position} position on ${pair} at ${openedAt}`
      const success = true
      return { success, message, pair: pairResult }
    } catch (error) { throw error }
  }

  async exitPosition({ id, closedAt }) {
    try {
      const user = await User.findById(this.context.req.session.userId)
      if(!user) throw new AuthenticationError('Invalid credentials!')

      const pair = await Pair.findById(id) 
      if(!pair) throw new AuthenticationError('Invalid credentials!')
      if(!pair.open) throw new ForbiddenError('Transaction already complete!')
      let pipDifFloat
      pair.position === 'long' 
        ? pipDifFloat = (closedAt - pair.openedAt).toFixed(4) 
        : pipDifFloat = (pair.openedAt - closedAt).toFixed(4)   
      pair.closedAt = closedAt
      pair.pipDif = pipDifFloat
      pair.profitLoss = pipDifFloat * pair.lotSize
      pair.open = false 
      const savedPair = await pair.save()

      user.bankroll += (pair.lotSize + savedPair.profitLoss) 
      await user.save() 

      const success = true 
      const message = `${savedPair.profitLoss > 0 ? `Congrats! ` : ''}${user.name} you've closed your ${savedPair.position} position on ${savedPair.pair} at ${closedAt}${savedPair.profitLoss > 0 ? '! For a profit of '+Math.round(savedPair.profitLoss) : '. For a loss of '+Math.round(savedPair.profitLoss)}`
      return { success, message, pair: savedPair }
    }
    catch (error) { throw error }
  }

  async getPair({ id }) {
    try {
      const user = await User.findById(this.context.req.session.userId)
      if(!user) throw new AuthenticationError('Invalid credentials')
      const pair = await Pair.findById(id)
      if(!pair || pair.user.toString() !== user.id.toString()) { 
        throw new AuthenticationError('Invalid credentials!') 
      } 
      return pair
    } catch (error) { throw error }
  }
  
  async findPairs() {
    try {
      const pairs = await Pair.find({ user: this.context.req.session.userId }).sort({ updatedAt: -1 })
      if(!pairs.length) throw new UserInputError('Nothing to show!')
      return [...pairs] 
    } catch (error) { throw error }
  }

  async additionalFunds({ amount }) {
    try {
      const user = await User.findById(this.context.req.session.userId)
      if(!user) throw new AuthenticationError('Invalid credentials!')
      user.bankroll += amount 
      const savedUser = await user.save()
      const success = true
      const message = `Congrats ${user.name} you've added ${amount} to your bankroll!`
      return { bankroll: savedUser.bankroll, success, message } 
    } catch (error) { throw error }
  }
}

module.exports = UserAPI
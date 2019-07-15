const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const Pair = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pair: {
    type: String,
    required: true 
  },
  lotSize: {
    type: Number,
    required: true 
  },
  position: {
    type: String,
    required: true 
  },
  openedAt: {
    type: Number,
    required: true 
  },
  closedAt: {
    type: Number,
  },
  pipDif: {
    type: Number,
  },
  profitLoss: {
    type: Number
  },
  open: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Pair', Pair) 
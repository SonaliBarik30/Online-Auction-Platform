import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startingPrice: {
    type: Number,
    required: true,
    min: 0
  },
  currentPrice: {
    type: Number,
    required: true
  },
  minBidIncrement: {
    type: Number,
    required: true,
    default: 1
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'ended'],
    default: 'upcoming'
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like-new', 'good', 'fair', 'poor']
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bids: [{
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Update status based on time
productSchema.methods.updateStatus = function() {
  const now = new Date();
  if (now < this.startTime) {
    this.status = 'upcoming';
  } else if (now >= this.startTime && now <= this.endTime) {
    this.status = 'active';
  } else {
    this.status = 'ended';
  }
  return this.save();
};

// Place a new bid
productSchema.methods.placeBid = async function(userId, bidAmount) {
  if (this.status !== 'active') {
    throw new Error('Auction is not active');
  }

  if (bidAmount <= this.currentPrice) {
    throw new Error('Bid amount must be higher than current price');
  }

  if (bidAmount < this.currentPrice + this.minBidIncrement) {
    throw new Error(`Minimum bid increment is ${this.minBidIncrement}`);
  }

  this.bids.push({
    bidder: userId,
    amount: bidAmount
  });

  this.currentPrice = bidAmount;
  this.highestBidder = userId;

  return this.save();
};

const Product = mongoose.model('Product', productSchema);

export default Product;
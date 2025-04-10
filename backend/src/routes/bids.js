import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Place a bid
router.post('/:productId', async (req, res, next) => {
  try {
    const { amount } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.placeBid(req.user._id, amount);
    
    // Emit socket event for real-time updates
    req.app.get('io').emit('newBid', {
      productId: product._id,
      currentPrice: product.currentPrice,
      highestBidder: req.user.username
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Get bids for a product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
      .populate('bids.bidder', 'username');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product.bids);
  } catch (error) {
    next(error);
  }
});

export default router;
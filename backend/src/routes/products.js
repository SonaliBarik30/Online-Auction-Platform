import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate('seller', 'username')
      .populate('highestBidder', 'username');
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Get a single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'username')
      .populate('highestBidder', 'username')
      .populate('bids.bidder', 'username');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Create a new product
router.post('/', async (req, res, next) => {
  try {
    const { title, description, startingPrice, minBidIncrement, startTime, endTime, images, category, condition } = req.body;

    const product = new Product({
      title,
      description,
      seller: req.user._id,
      startingPrice,
      currentPrice: startingPrice,
      minBidIncrement,
      startTime,
      endTime,
      images,
      category,
      condition
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// Update a product
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// Delete a product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
});

export default router;
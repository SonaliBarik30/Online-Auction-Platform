import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, IconButton } from '@mui/material';
import { Timer, Gavel, Favorite } from '@mui/icons-material';
import { mockProducts } from '../data/mockData';

const mockProductsData = [
  {
    id: 1,
    title: 'Luxury Vintage Rolex Watch',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f8f8f8"/><circle cx="100" cy="100" r="70" fill="%23e0e0e0" stroke="%23666" stroke-width="4"/><circle cx="100" cy="100" r="60" fill="none" stroke="%23666" stroke-width="2"/><rect x="95" y="65" width="10" height="35" fill="%23666" transform="rotate(45 100 100)"/><rect x="95" y="65" width="10" height="25" fill="%23666" transform="rotate(-60 100 100)"/></svg>',
    currentPrice: 15000,
    endTime: '2h 30m',
    bids: 25,
    description: 'Rare 1956 Rolex Submariner in excellent condition'
  },
  {
    id: 2,
    title: 'Victorian Era Mahogany Desk',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f8f8f8"/><rect x="40" y="80" width="120" height="60" fill="%238B4513"/><rect x="45" y="140" width="20" height="40" fill="%238B4513"/><rect x="135" y="140" width="20" height="40" fill="%238B4513"/><rect x="50" y="70" width="100" height="10" fill="%23A0522D"/></svg>',
    currentPrice: 8500,
    endTime: '4h 15m',
    bids: 12,
    description: 'Authentic Victorian writing desk with intricate carvings'
  },
  {
    id: 3,
    title: 'Contemporary Abstract Painting',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f8f8f8"/><path d="M40 40 L160 40 L100 160 Z" fill="%234CAF50"/><circle cx="120" cy="80" r="30" fill="%232196F3"/><rect x="60" y="60" width="40" height="40" fill="%23FFC107"/></svg>',
    currentPrice: 12000,
    endTime: '1d 2h',
    bids: 18,
    description: 'Original artwork by renowned modern artist'
  },
  {
    id: 4,
    title: 'Rare First Edition Book',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f8f8f8"/><rect x="50" y="40" width="100" height="120" fill="%23795548"/><rect x="60" y="50" width="80" height="100" fill="%23EFEBE9"/><line x1="70" y1="70" x2="130" y2="70" stroke="%23795548" stroke-width="2"/><line x1="70" y1="90" x2="130" y2="90" stroke="%23795548" stroke-width="2"/><line x1="70" y1="110" x2="130" y2="110" stroke="%23795548" stroke-width="2"/></svg>',
    currentPrice: 5000,
    endTime: '6h 45m',
    bids: 15,
    description: 'First edition of a classic literary masterpiece'
  },
  {
    id: 5,
    title: 'Vintage Camera Collection',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f8f8f8"/><rect x="50" y="60" width="100" height="80" fill="%23424242"/><circle cx="100" cy="100" r="25" fill="%23757575"/><circle cx="100" cy="100" r="20" fill="%23212121"/><rect x="70" y="50" width="60" height="10" fill="%23424242"/></svg>',
    currentPrice: 3500,
    endTime: '3d 5h',
    bids: 8,
    description: 'Collection of rare vintage cameras from the 1950s'
  }
];

export const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', bgcolor: '#f8f8f8' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Timer sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {product.endTime} left
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Gavel sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {product.bids} bids
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" color="primary">
                {product.currentPrice.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{(product.currentPrice * 83).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <IconButton size="small" sx={{ mr: 1 }}>
                <Favorite />
              </IconButton>
              <Button variant="contained" size="small">
                Bid Now
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderTop: 1, borderColor: 'divider' }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          Place Bid
        </Button>
        <IconButton
          size="small"
          sx={{
            ml: 1,
            '&:hover': { color: 'error.main' }
          }}
        >
          <Favorite />
        </IconButton>
      </Box>
    </Card>
  );
};

// Export already handled above
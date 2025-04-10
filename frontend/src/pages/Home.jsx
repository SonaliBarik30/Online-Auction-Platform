import React from 'react';
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';


const categories = ['Art', 'Antiques', 'Jewelry', 'Electronics', 'Fashion', 'Collectibles'];

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        backgroundImage: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 'md', mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Discover Unique Treasures
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.1rem', sm: '1.3rem' }
              }}
            >
              Bid on exclusive items from trusted sellers worldwide
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.2)'
                }
              }}
            >
              Start Bidding
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="lg" sx={{ mt: -3, mb: 6, position: 'relative', zIndex: 1 }}>
        <Box sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Popular Categories
          </Typography>
          <Grid container spacing={1.5}>
            {categories.map((category) => (
              <Grid item key={category}>
                <Chip
                  label={category}
                  clickable
                  sx={{
                    px: 2,
                    py: 2.5,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    bgcolor: 'background.default',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 4,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Featured Auctions
        </Typography>
        <Grid container spacing={3}>
          {mockProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
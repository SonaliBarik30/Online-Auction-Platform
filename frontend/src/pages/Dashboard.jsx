import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

const BuyerDashboard = ({ user }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>Your Bidding Activity</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Active Bids: <strong>5</strong></Typography>
          <Typography variant="body1">Won Auctions: <strong>3</strong></Typography>
          <Typography variant="body1">Watchlist Items: <strong>8</strong></Typography>
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12} md={8}>
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>Your Active Bids</Typography>
        <Box sx={{ mt: 2 }}>
          {mockProducts.slice(0, 3).map((product) => (
            <Box key={product.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle1">{product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Your Bid: ${product.currentBid}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>Recommended Auctions</Typography>
      <Grid container spacing={3}>
        {mockProducts.slice(0, 4).map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const SellerDashboard = ({ user }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>Seller Statistics</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Active Listings: <strong>4</strong></Typography>
          <Typography variant="body1">Completed Auctions: <strong>12</strong></Typography>
          <Typography variant="body1">Total Revenue: <strong>$2,450</strong></Typography>
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12} md={8}>
      <Paper sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" gutterBottom>Recent Auction Activity</Typography>
        <Box sx={{ mt: 2 }}>
          {mockProducts.slice(0, 3).map((product) => (
            <Box key={product.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle1">{product.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Highest Bid: ${product.currentBid}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>Your Active Listings</Typography>
      <Grid container spacing={3}>
        {mockProducts.slice(0, 4).map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.username}!
        </Typography>
        {user?.role === 'seller' ? <SellerDashboard user={user} /> : <BuyerDashboard user={user} />}
      </Box>
    </Container>
  );
  );
};

export default Dashboard;
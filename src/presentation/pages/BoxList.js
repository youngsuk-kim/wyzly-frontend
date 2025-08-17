import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InventoryIcon from '@mui/icons-material/Inventory';
import Layout from '../components/Layout';
import boxApi from '../../infrastructure/api/boxApi';

/**
 * BoxList page component
 * @returns {JSX.Element} BoxList page
 */
const BoxList = () => {
  const [boxes, setBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch boxes on component mount
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const data = await boxApi.getAllBoxes();
        setBoxes(data);
        setFilteredBoxes(data);
      } catch (err) {
        setError('Failed to load boxes. Please try again later.');
        console.error('Error fetching boxes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  // Filter boxes based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBoxes(boxes);
    } else {
      const filtered = boxes.filter(box => 
        box.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBoxes(filtered);
    }
  }, [searchTerm, boxes]);

  // Handle box click to navigate to detail page
  const handleBoxClick = (boxId) => {
    navigate(`/boxes/${boxId}`);
  };

  // Render stock status chip
  const renderStockStatus = (quantity) => {
    if (quantity > 10) {
      return <Chip label="In Stock" color="success" size="small" icon={<InventoryIcon />} />;
    } else if (quantity > 0) {
      return <Chip label={`Only ${quantity} left`} color="warning" size="small" icon={<InventoryIcon />} />;
    } else {
      return <Chip label="Out of Stock" color="error" size="small" icon={<InventoryIcon />} />;
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Boxes
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse our selection of boxes and place your order.
        </Typography>

        {/* Search box */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search boxes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 1.5, mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : filteredBoxes.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No boxes found. Please try a different search term.
        </Alert>
      ) : (
        <Grid container spacing={3} sx={{ mx: 'auto' }}>
          {filteredBoxes.map((box) => (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={box.id}>
              <Card 
                sx={{ 
                  height: 320, 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleBoxClick(box.id)}
              >
                <CardMedia
                  component="img"
                  height={160}
                  image={box.image}
                  alt={box.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 2,
                  height: 160
                }}>
                  <Box sx={{ mb: 1 }}>
                    {renderStockStatus(box.quantity)}
                  </Box>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontSize: '1rem',
                      lineHeight: 1.3,
                      mb: 0.5,
                      height: 40,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {box.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 1,
                      fontSize: '0.8rem'
                    }}
                  >
                    {box.quantity > 0 ? `${box.quantity} available` : 'Currently unavailable'}
                  </Typography>
                  <Box sx={{ 
                    mt: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 1
                  }}>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ 
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      ${box.price.toFixed(2)}
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="small"
                      disabled={box.quantity === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBoxClick(box.id);
                      }}
                      sx={{ 
                        fontSize: '0.75rem',
                        py: 0.5,
                        px: 1.5,
                        minWidth: '100px'
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default BoxList;

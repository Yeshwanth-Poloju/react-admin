// /frontend/src/components/AdventureDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const AdventureDashboard = () => {
  const [adventures, setAdventures] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  const fetchAdventures = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adventures');
      setAdventures(response.data);
    } catch (error) {
      console.error('Failed to fetch adventures:', error);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  const handleDialogOpen = (adventure) => {
    setSelectedAdventure(adventure);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePayment = async () => {
    if (!selectedAdventure) return;

    const options = {
      key: "rzp_test_USUKqObpxVODG3",
      amount: selectedAdventure.price * 100,
      currency: 'INR',
      name: selectedAdventure.name,
      description: 'Booking for Adventure',
      handler: async function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        try {
          const token = localStorage.getItem('token');
          await axios.post('http://localhost:5000/api/bookings/admin/bookings', {
            itemType: 'Adventure',  // Specify the item type here
            itemId: selectedAdventure._id,
            itemName: selectedAdventure.name,
            price: selectedAdventure.price,
            paymentId: response.razorpay_payment_id,
            paymentStatus: 'Completed',
            user: userId,
            userDetails: {
              name: userName,
              email: email,
            }
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          alert('Booking saved successfully!');
        } catch (error) {
          console.error('Error saving booking:', error);
          alert('Failed to save booking: ' + error.response.data.message);
        }
      },
      prefill: {
        name: userName || "Name",
        email: email || 'Email',
        contact: "PhoneNumber",
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="adventure-dashboard">
      <h2>Adventure Dashboard</h2>
      <Grid container spacing={3}>
        {adventures.map((adventure) => (
          <Grid item xs={12} sm={6} md={4} key={adventure._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="adventure">
                    {adventure.name.charAt(0)}
                  </Avatar>
                }
                title={adventure.name}
                subheader={`Location: ${adventure.location}`}
              />
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5000/${adventure.photos[0]}`}
                alt={adventure.name}
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Price: ${adventure.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Altitude: {adventure.altitude} m
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="more info" onClick={() => handleDialogOpen(adventure)}>
                  <Typography variant="h6" color="textPrimary">
                    ^
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedAdventure && (
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedAdventure.name}</DialogTitle>
          <DialogContent>
            <img
              src={`http://localhost:5000/${selectedAdventure.photos[0]}`}
              alt={selectedAdventure.name}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <Typography paragraph><strong>Altitude:</strong> {selectedAdventure.altitude} m</Typography>
            <Typography paragraph><strong>Price:</strong> ${selectedAdventure.price}</Typography>
            <Typography paragraph><strong>Description:</strong> {selectedAdventure.description}</Typography>
            <Typography paragraph><strong>Created At:</strong> {new Date(selectedAdventure.createdAt).toLocaleDateString()}</Typography>
            {selectedAdventure.photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${photo}`}
                alt={`Adventure ${index + 1}`}
                style={{ width: '100%', marginTop: '10px' }}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handlePayment}>
              Book Now
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdventureDashboard;


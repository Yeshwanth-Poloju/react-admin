// /frontend/src/components/ItineraryDashboard.jsx
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

const ItineraryDashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  const fetchItineraries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/itineraries');
      setItineraries(response.data);
    } catch (error) {
      console.error('Failed to fetch itineraries:', error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleDialogOpen = (itinerary) => {
    setSelectedItinerary(itinerary);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePayment = async () => {
    if (!selectedItinerary) return;

    const options = {
      key: "rzp_test_USUKqObpxVODG3",
      amount: selectedItinerary.price * 100,
      currency: 'INR',
      name: selectedItinerary.name,
      description: 'Booking for Itinerary',
      handler: async function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        try {
          const token = localStorage.getItem('token');
          await axios.post('http://localhost:5000/api/bookings/admin/bookings', {
            itemId: selectedItinerary._id,   // Use itemId instead of itineraryId
            itemType: 'Itinerary',           // Specify itemType
            itemName: selectedItinerary.name, // Use itemName instead of itineraryName
            price: selectedItinerary.price,
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
        name: "Name",
        email: 'Email',
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
    <div className="itinerary-dashboard">
      <h2>Itinerary Dashboard</h2>
      <Grid container spacing={3}>
        {itineraries.map((itinerary) => (
          <Grid item xs={12} sm={6} md={4} key={itinerary._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="itinerary">
                    {itinerary.name.charAt(0)}
                  </Avatar>
                }
                title={itinerary.name}
                subheader={`Drop Point: ${itinerary.drop}`}
              />
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5000/${itinerary.photos[0]}`}
                alt={itinerary.name}
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Price: ${itinerary.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Days: {itinerary.totalDays}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="more info" onClick={() => handleDialogOpen(itinerary)}>
                  <Typography variant="h6" color="textPrimary">...</Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedItinerary && (
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedItinerary.name}</DialogTitle>
          <DialogContent>
            <img
              src={`http://localhost:5000/${selectedItinerary.photos[0]}`}
              alt={selectedItinerary.name}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <Typography paragraph><strong>Total Days:</strong> {selectedItinerary.totalDays}</Typography>
            <Typography paragraph><strong>Pickup Point:</strong> {selectedItinerary.pickup}</Typography>
            <Typography paragraph><strong>Drop Point:</strong> {selectedItinerary.drop}</Typography>
            <Typography paragraph><strong>Price:</strong> ${selectedItinerary.price}</Typography>
            <Typography paragraph><strong>Description:</strong> {selectedItinerary.description}</Typography>
            <Typography paragraph><strong>Created At:</strong> {new Date(selectedItinerary.createdAt).toLocaleDateString()}</Typography>
            {selectedItinerary.photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${photo}`}
                alt={`Itinerary ${index + 1}`}
                style={{ width: '100%', marginTop: '10px' }}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handlePayment} style={{ marginTop: '20px' }}>
              Book Now
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ItineraryDashboard;

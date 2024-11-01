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

const TrekDashboard = () => {
  const [treks, setTreks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  const fetchTreks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/treks');
      setTreks(response.data);
    } catch (error) {
      console.error('Failed to fetch treks:', error);
    }
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  const handleDialogOpen = (trek) => {
    setSelectedTrek(trek);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePayment = async () => {
    if (!selectedTrek) return;

    const options = {
        key: "rzp_test_USUKqObpxVODG3",
        amount: selectedTrek.pricePerPerson * 100,
        currency: 'INR',
        name: selectedTrek.name,
        description: 'Booking for Trek',
        handler: async function (response) {
            alert(`Payment successful: ${response.razorpay_payment_id}`);
            try {
                const token = localStorage.getItem('token'); 
                await axios.post('http://localhost:5000/api/bookings/admin/bookings', {
                    itemId: selectedTrek._id, // This maps to `itemId` in the booking model
                    itemType: 'trek',          // This is `itemType`
                    itemName: selectedTrek.name, // This is `itemName`
                    price: selectedTrek.pricePerPerson,
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
    <div className="trek-dashboard">
      <h2>Trek Dashboard</h2>
      <Grid container spacing={3}>
        {treks.map((trek) => (
          <Grid item xs={12} sm={6} md={4} key={trek._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="trek">
                    {trek.name.charAt(0)}
                  </Avatar>
                }
                title={trek.name}
                subheader={`Drop Point: ${trek.dropPoint}`}
              />
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5000/${trek.photos[0]}`}
                alt={trek.name}
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Price: ${trek.pricePerPerson}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Altitude: {trek.altitude}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="more info" onClick={() => handleDialogOpen(trek)}>
                  <Typography variant="h6" color="textPrimary">...</Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedTrek && (
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedTrek.name}</DialogTitle>
          <DialogContent>
            <img
              src={`http://localhost:5000/${selectedTrek.photos[0]}`}
              alt={selectedTrek.name}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <Typography paragraph><strong>Altitude:</strong> {selectedTrek.altitude} m</Typography>
            <Typography paragraph><strong>Pickup Point:</strong> {selectedTrek.pickupPoint}</Typography>
            <Typography paragraph><strong>Drop Point:</strong> {selectedTrek.dropPoint}</Typography>
            <Typography paragraph><strong>Price Per Person:</strong> ${selectedTrek.pricePerPerson}</Typography>
            <Typography paragraph><strong>Inclusions:</strong> {selectedTrek.inclusion}</Typography>
            <Typography paragraph><strong>Description:</strong> {selectedTrek.description}</Typography>
            <Typography paragraph><strong>Created At:</strong> {new Date(selectedTrek.createdAt).toLocaleDateString()}</Typography>
            {selectedTrek.photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${photo}`}
                alt={`Trek ${index + 1}`}
                style={{ width: '100%', marginTop: '10px' }}
              />
            ))}

            {/* Book Now Button */}
            <Button variant="contained" color="primary" onClick={handlePayment} style={{ marginTop: '20px' }}>
              Book Now
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TrekDashboard;

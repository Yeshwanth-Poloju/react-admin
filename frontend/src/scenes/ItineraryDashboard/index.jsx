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

const ItineraryDashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

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

  return (
    <div className="itinerary-dashboard">
      <h2>Itinerary Dashboard</h2>
      <Grid container spacing={3}>
        {itineraries.map((itinerary) => (
          <Grid item xs={12} sm={6} md={4} key={itinerary._id}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Name and Drop Point as the CardHeader */}
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="itinerary">
                    {itinerary.name.charAt(0)}
                  </Avatar>
                }
                title={itinerary.name}
                subheader={`Drop Point: ${itinerary.drop}`}
              />

              {/* Itinerary Image */}
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5000/${itinerary.photos[0]}`} // Displaying the first photo
                alt={itinerary.name}
              />

              {/* Price and Total Days */}
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Price: ${itinerary.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Days: {itinerary.totalDays}
                </Typography>
              </CardContent>

              {/* Actions like More Info */}
              <CardActions disableSpacing>
                <IconButton aria-label="more info" onClick={() => handleDialogOpen(itinerary)}>
                  <Typography variant="h6" color="textPrimary">
                    ^
                  </Typography>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog to show full details */}
      {selectedItinerary && (
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedItinerary.name}</DialogTitle>
          <DialogContent>
            {/* Image First */}
            <img
              src={`http://localhost:5000/${selectedItinerary.photos[0]}`} 
              alt={selectedItinerary.name}
              style={{ width: '100%', marginBottom: '20px' }}
            />

            {/* Other details */}
            <Typography paragraph><strong>Total Days:</strong> {selectedItinerary.totalDays}</Typography>
            <Typography paragraph><strong>Pickup Point:</strong> {selectedItinerary.pickup}</Typography>
            <Typography paragraph><strong>Drop Point:</strong> {selectedItinerary.drop}</Typography>
            <Typography paragraph><strong>Price:</strong> ${selectedItinerary.price}</Typography>
            <Typography paragraph><strong>Description:</strong> {selectedItinerary.description}</Typography>
            <Typography paragraph><strong>Created At:</strong> {new Date(selectedItinerary.createdAt).toLocaleDateString()}</Typography>

            {/* Additional Photos (if any) */}
            {selectedItinerary.photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${photo}`}
                alt={`Itinerary photo ${index + 1}`}
                style={{ width: '100%', marginTop: '10px' }}
              />
            ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ItineraryDashboard;

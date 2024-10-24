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

const TrekDashboard = () => {
  const [treks, setTreks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);

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

  return (
    <div className="trek-dashboard">
      <h2>Trek Dashboard</h2>
      <Grid container spacing={3}>
        {treks.map((trek) => (
          <Grid item xs={12} sm={6} md={4} key={trek._id}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Name and Drop Point as the CardHeader */}
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="trek">
                    {trek.name.charAt(0)}
                  </Avatar>
                }
                title={trek.name}
                subheader={`Drop Point: ${trek.dropPoint}`}
              />
              
              {/* Trek Image */}
              <CardMedia
                component="img"
                height="194"
                image={`http://localhost:5000/${trek.photos[0]}`} // Displaying the first photo
                alt={trek.name}
              />

              {/* Price and Altitude */}
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Price: ${trek.pricePerPerson}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Altitude: {trek.altitude}m
                </Typography>
              </CardContent>

              {/* Actions like More Info */}
              <CardActions disableSpacing>
                <IconButton aria-label="more info" onClick={() => handleDialogOpen(trek)}>
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
      {selectedTrek && (
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedTrek.name}</DialogTitle>
          <DialogContent>
            {/* Image First */}
            <img
              src={`http://localhost:5000/${selectedTrek.photos[0]}`} 
              alt={selectedTrek.name}
              style={{ width: '100%', marginBottom: '20px' }}
            />

            {/* Other details */}
            <Typography paragraph><strong>Altitude:</strong> {selectedTrek.altitude} m</Typography>
            <Typography paragraph><strong>Pickup Point:</strong> {selectedTrek.pickupPoint}</Typography>
            <Typography paragraph><strong>Drop Point:</strong> {selectedTrek.dropPoint}</Typography>
            <Typography paragraph><strong>Price Per Person:</strong> ${selectedTrek.pricePerPerson}</Typography>
            <Typography paragraph><strong>Inclusions:</strong> {selectedTrek.inclusion}</Typography>
            <Typography paragraph><strong>Description:</strong> {selectedTrek.description}</Typography>
            <Typography paragraph><strong>Created At:</strong> {new Date(selectedTrek.createdAt).toLocaleDateString()}</Typography>

            {/* Additional Photos (if any) */}
            {selectedTrek.photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${photo}`}
                alt={`Trek photo ${index + 1}`}
                style={{ width: '100%', marginTop: '10px' }}
              />
            ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TrekDashboard;

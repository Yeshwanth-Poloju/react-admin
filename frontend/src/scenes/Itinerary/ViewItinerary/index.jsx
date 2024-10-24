import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

const ViewItinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const [expandedItineraryId, setExpandedItineraryId] = useState(null); // State to track which trek's description is expanded
    const navigate = useNavigate();

    const fetchItineraries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/itineraries');
            setItineraries(response.data);
        } catch (error) {
            console.error('Failed to fetch itineraries:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/itineraries/${id}`);
            fetchItineraries(); // Refresh the list
        } catch (error) {
            console.error('Failed to delete itinerary:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edititinerary/${id}`);
    };

    // Toggle expanded description
    const toggleDescription = (id) => {
        setExpandedItineraryId(expandedItineraryId === id ? null : id);
    };

    const handlePrintPDF = async (itinerary) => {
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text(`Itinerary: ${itinerary.name}`, 10, 10);
        doc.text(`Price: $${itinerary.price}`, 10, 20);
        doc.text(`Total Days: ${itinerary.totalDays}`, 10, 30);
        doc.text(`Pickup: ${itinerary.pickup}`, 10, 40);
        doc.text(`Drop: ${itinerary.drop}`, 10, 50);

        // Split the description into multiple lines if necessary
    const descriptionLines = doc.splitTextToSize(itinerary.description, 180); // 180 is the max width
    doc.text(descriptionLines, 10, 60); // Adjust Y-position as needed

    // Handle adding images to the PDF
    const photoX = 10; // X coordinate for the photos
    let photoY = 70 + descriptionLines.length * 10; // Adjust Y position after description
        // Loop through the photos and add them one by one
        for (const photo of itinerary.photos) {
            const fullPhotoUrl = `http://localhost:5000/${photo}`; // Construct full URL
            try {
                const image = await loadImage(fullPhotoUrl); // Load image as base64
                doc.addImage(image, 'JPEG', photoX, photoY, 60, 40); // Adjust size as needed
                photoY += 50; // Adjust Y position for the next image
            } catch (error) {
                console.error('Failed to load image for PDF:', error);
            }
        }

        // Save the PDF and trigger download
        doc.save(`itinerary-${itinerary._id}.pdf`);
    };

    // Helper function to load an image and return base64 data
    const loadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Handle CORS issues if necessary
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        fetchItineraries();
    }, []);

    return (
        <div>
            <h2>All Itineraries</h2>
            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Total Days</th>
                        <th>Pickup</th>
                        <th>Drop</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {itineraries.map(itinerary => (
                        <tr key={itinerary._id}>
                            <td>
                                {itinerary.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5000/${photo}`} // Adjust the URL as needed
                                        alt={`Itinerary ${index + 1}`}
                                        style={{ width: '50px', height: '50px', margin: '5px' }} // Adjust size and margin as needed
                                    />
                                ))}
                            </td>
                            <td>{itinerary.name}</td>
                            <td>${itinerary.price}</td>
                            <td>{itinerary.totalDays}</td>
                            <td>{itinerary.pickup}</td>
                            <td>{itinerary.drop}</td>
                            <td style={{ maxWidth: "600px" }}>
                                {expandedItineraryId === itinerary._id
                                    ? (
                                        <>
                                            <p>{itinerary.description}</p>
                                            <b> <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => toggleDescription(itinerary._id)}>Show Less</p> </b>

                                        </>
                                    )
                                    : (
                                        <>
                                            <p>{itinerary.description.substring(0, 100)}...</p>
                                            <b> <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => toggleDescription(itinerary._id)}>See More</p> </b>


                                        </>
                                    )
                                }
                            </td>
                            <td>
                                <Tooltip title="Edit" placement="top">
                                    <IconButton onClick={() => handleEdit(itinerary._id)}
                                        sx={{
                                            color: 'inherit',
                                            '&:hover': {
                                                color: 'blue', // Change color on hover
                                            },
                                        }}>
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="bottom">
                                    <IconButton onClick={() => handleDelete(itinerary._id)}
                                        sx={{
                                            color: 'inherit',
                                            '&:hover': {
                                                color: 'red', // Change color on hover
                                            },
                                        }}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Print" placement="bottom">
                                    <IconButton onClick={() => handlePrintPDF(itinerary)}
                                        sx={{
                                            color: 'inherit',
                                            '&:hover': {
                                                color: 'white', // Change color on hover
                                            },
                                        }}>
                                        <PrintOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewItinerary;

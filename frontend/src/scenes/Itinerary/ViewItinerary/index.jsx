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

        // Add border to the page
        doc.setLineWidth(0.5);
        doc.rect(5, 5, 200, 287); // Adjust dimensions for the border (x, y, width, height)

        // Print date on the top right corner
        const printDate = new Date().toLocaleDateString();
        doc.text(`Print Date: ${printDate}`, 145, 12); // Right-aligned

        // Handle adding images to the PDF
        const fullWidth = 200; // Full width for images
        let photoY = 20; // Starting Y position after the date

        for (const photo of itinerary.photos) {
            const fullPhotoUrl = `http://localhost:5000/${photo}`; // Construct full URL
            try {
                const image = await loadImage(fullPhotoUrl); // Load image as base64
                const imageWidth = 180; // Set image width (account for padding)
                const imageHeight = 80; // Set image height
                const xPos = (fullWidth - imageWidth) / 2; // Calculate X position for center alignment

                doc.addImage(image, 'JPEG', xPos, photoY, imageWidth, imageHeight); // Center aligned
                photoY += imageHeight + 5; // Move down for the next image
            } catch (error) {
                console.error('Failed to load image for PDF:', error);
            }
        }

        // Add Itinerary name after images
        doc.setFontSize(18);
        doc.text(`Itinerary: ${itinerary.name}`, 10, photoY + 4); // Adjust Y position for itinerary name
        photoY += 12; // Move down for the details

        // Add other details with Unicode icons
        const details = [
            { label: 'Price:', value: `$${itinerary.price}`, icon: String.fromCharCode(0x1F4B5) }, // 💰
            { label: 'Total Days:', value: itinerary.totalDays, icon: String.fromCharCode(0x1F4C5) }, // 📅
            { label: 'Pickup:', value: itinerary.pickup, icon: String.fromCharCode(0x1F4CD) }, // 📍
            { label: 'Drop:', value: itinerary.drop, icon: String.fromCharCode(0x1F697) }, // 🚗
        ];

        doc.setFontSize(12);
        details.forEach((detail, index) => {
            doc.text(`${detail.icon} ${detail.label} ${detail.value}`, 10, photoY + (index * 10)); // Adjust Y position for each detail
        });

        // Add description
        const descriptionLines = doc.splitTextToSize(itinerary.description, 180); // 180 is the max width
        doc.text(descriptionLines, 10, photoY + (details.length * 10)); // Adjust Y position for description

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

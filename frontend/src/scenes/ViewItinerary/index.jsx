import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const ViewItinerary = () => {
    const [itineraries, setItineraries] = useState([]);
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

    const handlePrintPDF = (itinerary) => {
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text(`Itinerary: ${itinerary.name}`, 10, 10);
        doc.text(`Price: $${itinerary.price}`, 10, 20);
        doc.text(`Total Days: ${itinerary.totalDays}`, 10, 30);
        doc.text(`Pickup: ${itinerary.pickup}`, 10, 40);
        doc.text(`Drop: ${itinerary.drop}`, 10, 50);
        doc.text(`Description: ${itinerary.description}`, 10, 60);

        // Save the PDF and trigger download
        doc.save(`itinerary-${itinerary._id}.pdf`);
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
                            <td>{itinerary.name}</td>
                            <td>${itinerary.price}</td>
                            <td>{itinerary.totalDays}</td>
                            <td>{itinerary.pickup}</td>
                            <td>{itinerary.drop}</td>
                            <td>{itinerary.description}</td>
                            <td>
                                <button onClick={() => handleEdit(itinerary._id)}>Edit</button>
                                <button onClick={() => handleDelete(itinerary._id)}>Delete</button>
                                <button onClick={() => handlePrintPDF(itinerary)}>Print PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewItinerary;

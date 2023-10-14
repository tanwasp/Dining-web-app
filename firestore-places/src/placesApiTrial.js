const axios = require('axios');

const API_KEY = 'YOUR_API_KEY'; // Replace with your Google Places API key
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

async function findPlace(input) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                input: input,
                inputtype: 'textquery',
                fields: 'name,formatted_address,geometry',
                key: API_KEY
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data from Google Places API:', error.message);
    }
}

// Example usage:
const userInput = 'pizza'; // You can replace this with any other input or get it dynamically, e.g., from command line arguments.
findPlace(userInput);

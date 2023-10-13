const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
});

exports.searchRestaurants = async (req, res) => {
    try {
        const query = req.query.q;
        const response = await googleMapsClient.places({
            query: query,
            type: 'restaurant'
        }).asPromise();

        res.json(response.json.results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

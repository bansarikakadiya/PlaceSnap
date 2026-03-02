const axios = require('axios');
const HttpError = require('../models/http-error');
const API_KEY = process.env.GOOGLE_API_KEY;

const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    'https://nominatim.openstreetmap.org/search',
    {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'simple-mern-app' // IMPORTANT
      }
    }
  );

  const data = response.data;

  if (!data || data.length === 0) {
    throw new HttpError(
      'Could not find location for the specified address.',
      422
    );
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };
};

module.exports = getCoordsForAddress;
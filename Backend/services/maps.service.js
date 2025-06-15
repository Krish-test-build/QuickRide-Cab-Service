const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.VITE_LOCATIONIQ_API_KEY; 
    const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
      params: {
        key: apiKey,
        q: address,
        format: 'json'
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error('No coordinates found for the given address');
    }
  } catch (error) {
    throw error;
  }
};

module.exports.getDistanceTime =async(origin,destination )=>{
    if(!origin||!destination){
        throw new Error('Origin and Destination are Both Required')
    }

    const apiKey = process.env.VITE_LOCATIONIQ_API_KEY; 

    try{
        const [originCoord, destinationCoord] = await Promise.all([
            module.exports.getAddressCoordinate(origin),
            module.exports.getAddressCoordinate(destination)
        ]);
        

        const response = await axios.get(`https://us1.locationiq.com/v1/directions/driving/${originCoord.lon},${originCoord.lat};${destinationCoord.lon},${destinationCoord.lat}`,
    {
        params: {
        key: apiKey,
        steps: false,
        overview: 'false'
        }
    }
    );
        

        if (
            response.data &&
            response.data.routes &&
            response.data.routes.length > 0
        ) {
            const route = response.data.routes[0];
            return {
                distance: route.distance/1000,
                duration: route.duration/60 
            };
        } else {
            throw new Error('No route found between the given locations');
        }

    }catch(err){
        throw err
    }

}

module.exports.getAutoCompleteSuggestions =async (input) => {
     if(!input){
        throw new Error('Query is Required')
    }
  try {
    const apiKey = process.env.VITE_LOCATIONIQ_API_KEY; 
    
    const response = await axios.get('https://us1.locationiq.com/v1/autocomplete.php', {
      params: {
        key: apiKey,
        q: input,
        format: 'json'
      }
    });

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(item => ({
        display_name: item.display_name,
        lat: item.lat,
        lon: item.lon
      }));
    } else {
      throw new Error('No suggestions found for the given input');
    }
   
  } catch (error) {
    throw error;
  }
};
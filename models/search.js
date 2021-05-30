const axios = require('axios')

class Searches{

    _register = ['Parana', 'Santa Fe', 'Concepcion del Uruguay','Hernandarias','Buenos Aires','Rosario','Tokyo','New York']

    async site( city ){
        try {

            const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoibHVjaGlhcnEiLCJhIjoiY2twYWlseXdlMHExYzJ1cG5rNGY2bzF0aSJ9.FSyhAverLYplF7qUMpUfMA&limit=5&language=es`);
            return resp.data.features

        } catch (err) {
            console.log('No se encontraron ciudades que coincidan con:',city)
            return []
        }
    }

}

module.exports = Searches
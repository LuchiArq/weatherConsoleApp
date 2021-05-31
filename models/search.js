const axios = require('axios')
const {TOKEN_OPENWEATHER,TOKEN_MAPBOX} = process.env

class Searches{

    _register = []


    get paramsMapBox(){
        return {
            'access_token':TOKEN_MAPBOX,
            'limit': 5,
            'language':'es'
        }
    }

    paramsOpenWeather(lat,lng){
        return {
            'lat': lat,
            'lon':lng,
            'appid':TOKEN_OPENWEATHER,
            'units':'metric',
            'lang':'es'
        }
    }

    async site( city ){
        try {

            const intanceAxios = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapBox
            });

            const resp = await intanceAxios.get();
            return resp.data.features.map( op => ({

                name:op.place_name,
                value: op.text,
                lng: op.center[0],
                lat: op.center[1],
                id: op.id

            }) );

        } catch (err) {
            console.log('No se encontraron ciudades que coincidan con:',city);
            return []
        }
    }

    async weather(lat,lng){

        try {
            const intanceAxios = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.paramsOpenWeather(lat,lng)
            });

            const {data} = await intanceAxios.get();
            //console.log("WEATHER:",data)
            return{
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_max,
                description: data.weather[0].description,
            }
            

        } catch (err) {
            console.log('No se encontraron datos que coincidan con:',city);
            return []
        }

    }

    saveRegister(city){
      //  this._register[city.id] = city;
        let exist = this._register.find(site=> site===city)
        if(exist) return
        this._register.unshift(city)
    }

    lodaRegister(register){
        this._register=register
    }

}

module.exports = Searches
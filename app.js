require('colors');
require('dotenv').config()

const {
    writeRegisters,
    readRegisters,
} = require('./helpers/optionsDB')

const {
    mainMenu,
    pause,
    readInput,
    getRegister,
    listOptions
} = require('./helpers/inquirer.js');
const Searches = require('./models/search')

let option = ''
readRegisters()
const main = async () =>{

    const search = new Searches()
    
    do{
         option = await mainMenu()
        
        switch (option) {
            case '1':
                //BUSCAR CIUDAD
                const city = await readInput("Buscar ciudad");
                const listCities = await search.site(city);

                //DATOS GEOGRAFICOS DE LA CIUDAD
                const id = await listOptions(listCities);
                const cityData = listCities.find(c=> c.id===id)
                  
                if(id ==='0') continue

                //GUARDAR HISTORIAL 
                search.saveRegister(cityData.name)
                //BUSCAR CLIMA DE LA CIUDAD
                const cityWeather = await search.weather(cityData.lat,cityData.lng)
                //MOSTRAD DATOS COMPLETOS DE LA CIUDAD
                console.log();
                console.log('Ciudad:'.yellow,cityData.name);
                console.log('Clima:'.yellow,cityWeather.description);
                    console.log('Lat:'.yellow,cityData.lat.toString());
                console.log('Lng:'.yellow,cityData.lng.toString()); 
                console.log('Temperatura:'.yellow,cityWeather.temp);
                console.log('Minima:'.yellow,cityWeather.temp_min);
                console.log('Maxima:'.yellow,cityWeather.temp_max);
                console.log() 
            

            break;
    
            case '2':
                await getRegister(search._register)     
            break;
        }
        //GUARDAR EN BASE DE DATOS
        writeRegisters(search._register)

       if(option !=='0') {
        await pause()
       }

    }while(option !== '0')
}

main();
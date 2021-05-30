require('colors');

const {
    mainMenu,
    pause,
    readInput,
    getRegister,
    listOptions
} = require('./helpers/inquirer.js');
const Searches = require('./models/search')

let option = ''

const main = async () =>{

    const search = new Searches()

    do{
         option = await mainMenu()
        
        switch (option) {
            case '1':
                //BUSCAR CIUDAD
                console.log("Opcion 1", {option});
                const city = await readInput("Buscar ciudad");
                const resp = await search.site(city);

                //DATOS GEOGRAFICOS DE LA CIUDAD
                const cityData = await listOptions(resp);

                //BUSCAR CLIMA DE LA CIUDAD

                //MOSTRAD DATOS COMPLETOS DE LA CIUDAD
                console.log(cityData);
                console.log('Ciudad:'.yellow,cityData.name);
                console.log('Lat:'.yellow,cityData.lat.toString());
                console.log('Lng:'.yellow,cityData.lng.toString());
                console.log('Temperatura:'.yellow,);
                console.log('Minima:'.yellow,);
                console.log('Maxima:'.yellow,);
                console.log()
            break;
    
            case '2':
                console.log("Opcion 2", {option});
                await getRegister(search._register)     
            break;
        }

       if(option !=='0') {
        await pause()
       }

    }while(option !== '0')
}

main();
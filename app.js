require('colors');
const {
    mainMenu,
    pause
} = require('./helpers/inquirer.js');

let option = ''

const main = async () =>{

    do{
         option = await mainMenu()
        
        switch (option) {
            case '1':
                console.log("Opcion 1", {option})
            break;
    
            case '2':
                console.log("Opcion 2", {option})      
            break;
        }

        await pause()

    }while(option !== '0')
}

main();
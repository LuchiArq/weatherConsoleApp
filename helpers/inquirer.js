const inquirer = require('inquirer');


const mainMenu = async() =>{
    const preguntas = {
        type: 'list',
        message: 'Que desea hacer',
        name: 'opcion',
        choices: [
            {
                value: '1',
                name:'1.'.green + ' Buscar ciudad',
            },
            {
                value: '2',
                name:'2.'.green + ' Historial',
            },
            {
                value: '0',
                name:'0.'.green + ' Salir',
            }
        ]
    }

    console.clear()
    console.log('======================='.green);
    console.log('   Elegir una opcion'.green);
    console.log('=======================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion
}


const pause = async () =>{
    const pausa = {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.green} para continuar`,
    
    }
    return await inquirer.prompt(pausa)
}


module.exports = {
    mainMenu,
    pause
}
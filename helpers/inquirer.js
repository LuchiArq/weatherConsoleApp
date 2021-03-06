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

const readInput = async (message) =>{
    const input = {
        type: 'input',
        name: 'site',
        message,
        validate( value ){
            if(!value.length) return "Por favor ingrese una ciudad";
            return true
        }
     }

     const { site } = await inquirer.prompt(input)
     
     return site

}

const getRegister = async ( register ) =>{
   let cities = []
   if(register.length){
       register.forEach((city,i)=> {
            if(i<=5){
                let index = i+1 + '.';
                obj = {
                    value : city,
                    name: `${index.green} ${city}`
                }
                cities.push(obj)
            }
        })
   }else{
       cities.push({
           value:'0',
           name:'Historial vacio'
       })
   }
    const listCities = {
        type: 'list',
        message: 'Historial de busqueda',
        choices: cities,
        name: 'registerSearch'

    }

    const {registerSearch} = await inquirer.prompt(listCities)

    return registerSearch

} 

const listOptions = async (options) => {

    const choices = options.map( (op,i) => {

        const index = i+1 +'.'
        return{
            value: op.id,
            name:`${index.green} ${op.name}`
        }
    }) 

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const listCityOptions = {
        type: 'list',
        message: 'Resultados:',
        choices,
        name: 'id'
    }

    const {id} = await inquirer.prompt(listCityOptions)

    return id
}


module.exports = {
    mainMenu,
    pause,
    readInput,
    getRegister,
    listOptions
}
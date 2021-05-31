const fs = require('fs');

const path = './DB/registers.json';

const writeRegisters = (data) =>{
    
    fs.writeFileSync(path, JSON.stringify(data))
}

const readRegisters = () =>{

    if(!fs.existsSync(path)) {
        return null
    }
    const info = fs.readFileSync(path, {encoding:'utf-8'})
    const data = JSON.parse(info)

    return data
}

module.exports = {
    writeRegisters,
    readRegisters,
}
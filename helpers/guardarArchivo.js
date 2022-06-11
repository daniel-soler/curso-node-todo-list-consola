
const fs = require("fs");

const archivo = "./db/data.json"


const guardarDB = ( data ) => {

  data = JSON.stringify( data );
  fs.writeFileSync( archivo, data );

}


const cargarDB = ( ) => {

  const archivo = "./db/data.json"

  if ( !fs.existsSync(archivo) ) return null;
  
  const data = JSON.parse( fs.readFileSync( archivo, { encoding: "utf-8" } ) )

  return data

}




module.exports = {
  guardarDB,
  cargarDB
}
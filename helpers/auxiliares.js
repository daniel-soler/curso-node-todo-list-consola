require("colors");

const listarTareas = ( arrayTareas, tipo = null ) => {

  console.log("");
  
  let i = 1;
  let arraySeleccionadas;;

  if ( tipo === "pendiente" ) arraySeleccionadas = arrayTareas.filter( tarea => tarea.completadoEn === null );
  else if ( tipo === "finalizada" ) arraySeleccionadas = arrayTareas.filter( tarea => tarea.completadoEn != null );
  else arraySeleccionadas = arrayTareas;

  arraySeleccionadas.forEach(tarea => {
    
    const estado = tarea.completadoEn != null ? tarea.completadoEn.green : "Pendiente".red;

    console.log( `${ (""+i).green } ${tarea.descripcion} :: ${ estado}` );

    i++;

  });

  
}

module.exports = {
  listarTareas
}
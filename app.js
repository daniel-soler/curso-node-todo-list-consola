require("colors");



const { guardarDB, cargarDB } = require("./helpers/guardarArchivo");
// const { mostrarMenu, pausa } = require( "./helpers/mensajes" )

const { inquirerMenu, pausa, leerInput, seleccionarTareas, confirmar } = require( "./helpers/inquirer" )
const { listarTareas } = require( "./helpers/auxiliares" )
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");




console.clear();



const main = async () => {

  const tareas = new Tareas();
  
  const tareasDB = cargarDB();
  if ( tareasDB ) {
    tareasDB.forEach(tarea => {
      tareas.cargarTarea(tarea.id, tarea.descripcion, tarea.completadoEn)
    });
  }

  let opt;
  let seleccionadas;
  do{

    opt = await inquirerMenu();

    switch (opt) {
      //Crear tarea
      case 1:
        const descripcion = await leerInput( "Descripcion: " );
        tareas.crearTarea(descripcion);
      break;
        
      //Listar tareas
      case 2:
        listarTareas( tareas.listadoTareas );
      break;

      //Listar tareas completadas
      case 3:
        listarTareas( tareas.listadoTareas, "finalizada" );
      break;

      //Listar tareas pendientes
      case 4:
        listarTareas( tareas.listadoTareas, "pendiente" );
      break;

      //Completar tarea(s)
      case 5:
        seleccionadas = await seleccionarTareas( tareas.listadoTareas, true );
        tareas.listadoTareas.forEach( tarea => {
                                if (seleccionadas.includes(tarea.id)) tareas.completarTarea( tarea.id, true);
                                else tareas.completarTarea( tarea.id, false);
                              });
      break;

      //Borrar tarea
      case 6:
        seleccionadas = await seleccionarTareas( tareas.listadoTareas );
        const ok = await confirmar("¿Está seguro?");
        if (ok) seleccionadas.forEach( tarea => tareas.borrarTarea( tarea ) );
      break;

    };
    
    guardarDB(tareas.listadoTareas)

    if(opt != 7) await pausa();

  } while (opt != 7);
  

}


main();
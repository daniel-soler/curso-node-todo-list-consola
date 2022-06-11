const inquirer = require("inquirer");
require("colors");




const inquirerMenu = async () => {
  console.clear();

  console.log( "========================".green );
  console.log( " Seleccione una opción ".green );
  console.log( "========================\n".green );

  const opciones = [{ value: 1, name:`${ '1.'.green } Crear tarea`},
                    { value: 2, name:`${ '2.'.green } Listar tareas`},
                    { value: 3, name:`${ '3.'.green } Listar tareas completadas`},
                    { value: 4, name:`${ '4.'.green } Listar tareas pendientes`},
                    { value: 5, name:`${ '5.'.green } Completar tarea(s)`},
                    { value: 6, name:`${ '6.'.green } Borrar tarea`},
                    { value: 7, name:`${ '7.'.green } Salir`}];

  const opt = await inquirer
          .prompt([
            {
              type: "list",
              name: "menu",
              message: "¿Qué desea hacer?",
              choices: opciones
            }
          ]);

  return opt.menu;
  
}





const pausa = async () =>{

  console.log("\n");
  return inquirer.prompt({
    type: "input",
    name: "pausa",
    message: `Pulsa ${ "ENTER".green } para continuar...`
  })

}





const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate( value ) {
        if ( value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question)
  return desc;
}

const seleccionarTareas = async ( listado, completadas = false ) => {

  const opciones = [];

  listado.forEach(tarea => {
    opciones.push( {
                      value: tarea.id,
                      name: tarea.descripcion,
                      checked: completadas
                                    ? (tarea.completadoEn ? true : false)
                                    : false
                    })
  });

  const respuesta = await inquirer.prompt({
    type: "checkbox",
    name: "tarea",
    message: "Selecciona las tareas: ",
    choices: opciones
  })

  return respuesta.tarea;

}

const confirmar = async ( mensaje ) => {

  const { ok } = await inquirer.prompt({
    type: "confirm",
    name: "ok",
    message: mensaje
  })

  return ok
}



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  seleccionarTareas,
  confirmar
}
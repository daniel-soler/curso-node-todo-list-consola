const Tarea = require("./tarea");

class Tareas {
  
  _listado = {};

  constructor( ) {
    this._listado = {};
  }

  crearTarea( desc = "" ) {
    const tarea = new Tarea( desc );
    this._listado[tarea.id] = tarea;
  }

  cargarTarea( id, descripcion, completadoEn ) {
    const tarea = new Tarea();
    tarea.id = id;
    tarea.descripcion = descripcion;
    tarea.completadoEn = completadoEn;
    this._listado[id] = tarea;
  }

  borrarTarea( id ) {
    if ( this._listado[ id ] ) delete this._listado[ id ];
  }

  completarTarea ( id, estado ) {
    this._listado[ id ].completadoEn = estado
                                          ? new Date().toISOString()
                                          : null;
  }

  get listadoTareas(  ) {

    const listado = [];

    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push( tarea )
    })

    return listado;

  }


}

module.exports = Tareas;
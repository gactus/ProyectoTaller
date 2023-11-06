import React from "react";
import ListadoUsuarios from "./usuarios/listadoUsuarios";
function Usuarios() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3><span className='fa fa-group'></span>&nbsp;Datos de Usuarios</h3>
                        </div>
                        <div className='card-body'>
                            <ListadoUsuarios/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Usuarios;
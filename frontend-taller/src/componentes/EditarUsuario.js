import React from 'react';
import '../styleesheets/Dashboard.css';
import CambiarContrasena from './usuarios/CambiarContrasena';

function EditarUsuario() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3><span className='fa fa-lock'></span>&nbsp;Cambiar mi Contraseña</h3>
                        </div>
                        <div className='card-body'>
                            <CambiarContrasena/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
    
}

export default EditarUsuario;

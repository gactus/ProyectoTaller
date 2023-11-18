import React from 'react';
import '../styleesheets/Dashboard.css';

function Vehiculos() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3><span className='fa fa-car'></span>&nbsp;Gestión de Vehículos</h3>
                        </div>
                        <div className='card-body'>
                            {/* Contenido específico para la gestión de vehículos */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Vehiculos;
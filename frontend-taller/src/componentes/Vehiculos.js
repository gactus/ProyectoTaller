import React from 'react';
import '../styleesheets/Dashboard.css';
import ListadoVehiculos from './vehiculos/ListadoVehiculos';

function Vehiculos() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-sm-10 col-md-10 col-lg-10'>
                                <h3><span className='fa fa-car'></span>&nbsp;Gestión de Vehículos</h3>
                                </div>
                                <div className='col-sm-2 col-md-2 col-lg-2'>
                                    <button className='btn-agregar'><span className='fa fa-plus-square'></span>&nbsp;Nuevo</button>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <ListadoVehiculos/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Vehiculos;
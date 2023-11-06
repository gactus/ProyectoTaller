import React from 'react';
import '../styleesheets/Dashboard.css';
import ListadoInsumos from './insumos/ListadoInsumos';

function Inventario() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3><span className='fa fa fa-cubes'></span>&nbsp;Inventario de insumos</h3>
                        </div>
                        <div className='card-body'>
                            <ListadoInsumos/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
    
}

export default Inventario;

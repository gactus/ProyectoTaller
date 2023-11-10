import React from 'react';
import '../styleesheets/Dashboard.css';
import ListadoTrabajos from './trabajos/ListadoTrabajos';

function Trabajos() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className="col-sm-3 col-md-3 col-lg-3"></div>
                                <div className='col-lg-3'>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <button className='btn-agregar'><span className='fa fa-plus-square'></span>&nbsp;Nuevo</button>
                                    </div>
                                </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <button className='btn-agregar'><span className='fa fa-file-text-o'></span>&nbsp;Cotizar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-sm-10 col-md-10 col-lg-10'>
                                    <h3><span className='fa fa-wrench'></span>&nbsp;Mis Trabajos</h3>
                                </div>
                                <div className='col-sm-2 col-md-2 col-lg-2'>
                                    
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <ListadoTrabajos/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
    
}

export default Trabajos;

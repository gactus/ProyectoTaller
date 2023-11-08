import React from 'react';
import '../styleesheets/Dashboard.css';
import TrabajosCurso from './Dashboard/TrabajosCurso';
import TrabajosEspera from './Dashboard/TrabajosEspera';
import TrabajosFinalizados from './Dashboard/TrabajosFinalizados';
import ListadoTrabajosDashBoard from './Dashboard/ListadoTrabajosDashBoard'; 
import InsumosStock from './Dashboard/InsumosStock';

function Dashboard() {

    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3><span className='fa fa fa-tachometer'></span>&nbsp;Información General</h3>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className="col-sm-3 col-md-3 col-lg-3"></div>
                                <div className='col-lg-2'>
                                    <TrabajosCurso/>
                                </div>
                                <div className='col-lg-2'>
                                    <TrabajosEspera/>
                                </div>
                                <div className='col-lg-2'>
                                    <TrabajosFinalizados/>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3"></div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 col-lg-12 text-center'>
                                    <br/>
                                    <InsumosStock/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <ListadoTrabajosDashBoard/>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </main>
    );
    
}

export default Dashboard;

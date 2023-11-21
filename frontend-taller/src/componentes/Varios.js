import React from 'react';
import '../styleesheets/Dashboard.css';
import { Accordion } from 'react-bootstrap';
import ListadoTrabajos from './trabajos/ListadoTrabajos';
import ListadoMarcas from './marcas/ListadoMarcas';
import ListadoBancos from './bancos/ListadoBancos';
import ListadoTipoInsumos from './tipo_insumos/ListadoTipoInsumos';
import ListadoTipoCuentas from './tipo_cuentas/ListadoTipoCuentas';

function varios() {
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-sm-12 col-md-12 col-lg-12'>
                                <h3><span className='fa fa-cogs'></span>&nbsp;Parametrías Varias</h3>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <Accordion>
                                <Accordion.Item eventKey='0' className='card-header'>
                                    <Accordion.Header ><span className='textosNormal'><span className='fa fa-trademark'></span>&nbsp;Marcas</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ListadoMarcas/>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='1' className='card-header'>
                                    <Accordion.Header><span className='textosNormal'><span className='fa fa-car'></span>&nbsp;Modelos</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ListadoTrabajos/>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='2' className='card-header'>
                                    <Accordion.Header><span className='textosNormal'><span className='fa fa-flask'></span>&nbsp;Tipos de Insumos</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ListadoTipoInsumos/>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='3' className='card-header'>
                                    <Accordion.Header><span className='textosNormal'><span className='fa fa-university'></span>&nbsp;Bancos</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ListadoBancos/>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey='4' className='card-header'>
                                    <Accordion.Header><span className='textosNormal'><span className='fa fa-credit-card-alt'></span>&nbsp;Tipo Cuentas Bancarias</span></Accordion.Header>
                                    <Accordion.Body>
                                        <ListadoTipoCuentas/>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default varios;
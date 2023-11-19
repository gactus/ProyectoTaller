import React from 'react';
import '../styleesheets/Dashboard.css';
import ListadoInsumos from './insumos/ListadoInsumos';
import RegistrarInsumo from './insumos/RegistrarInsumo';
import { useState, useEffect } from "react";  
import { Modal, Button } from 'react-bootstrap'; 

function Inventario() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const cerrarModal = ()=>{
        setShowModal(false);
    }
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-sm-10 col-md-10 col-lg-10'>
                                    <h3><span className='fa fa fa-cubes'></span>&nbsp;Inventario de insumos</h3>
                                </div>
                                <div className='col-sm-2 col-md-2 col-lg-2'>
                                    <button className='btn-agregar' onClick={handleShow}><span className='fa fa-plus-square'></span>&nbsp;Nuevo</button>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <ListadoInsumos/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} style={{ maxWidth: '100%' }}>
                <Modal.Body>
                    <RegistrarInsumo/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal()}><span className='textosNormal'><span className='fa fa-close'></span>&nbsp;Cerrar</span></button>
                </Modal.Footer>
            </Modal>
        </main>
    );
    
}

export default Inventario;

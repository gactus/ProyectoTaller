import React from 'react';
import '../styleesheets/Cliente.css';
import ListadoClientes from './clientes/ListadoClientes';
import RegistrarClientes from './clientes/RegistrarCliente';
import { useState, useEffect } from "react";  
import { Modal, Button } from 'react-bootstrap';  
import Swal from "sweetalert2";

function Clientes() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const registrarCliente = ()=>{
        Swal.fire({
            title: "<strong>Error</strong>",
            html:
                <RegistrarClientes/>,
            icon: "error",
          });
    }
    return (
        <main>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='row'>
                                <div className='col-sm-10 col-md-10 col-lg-10'>
                                    <h3><span className='fa fa-address-book'></span>&nbsp;Listado Clientes</h3>
                                </div>
                                <div className='col-sm-2 col-md-2 col-lg-2'>
                                    <button onClick={handleShow} className='btn-agregar'><span className='fa fa-plus-square'></span>&nbsp;Nuevo</button>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <ListadoClientes/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
        show={show}
        onHide={handleClose}
        style={{ maxWidth: '100%' }}
      >
            <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <RegistrarClientes/>
                </Modal.Body>
            </Modal>
        </main>
    );
}
export default Clientes;
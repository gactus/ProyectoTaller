import React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";

function RegistrarClientes(){
    const [trabajosList, setTrabajos] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        listarTrabajos();
    }, []);

    const listarTrabajos = async() =>{
        await Axios.get("http://localhost:8010/api/trabajos/listadoTrabajosAdmin",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    };
    return(
        <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-address-book'></span>&nbsp;Registrar Cliente</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row'>
                        <div className="form-group">
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                            <div className='col-sm-2 col-md-2 col-lg-2'>Nombres:</div>
                            <div className="col-sm-8 col-md-8 col-lg-6">
                                <input id="fname" name="name" type="text" placeholder="Andrés Alejandro" class="form-control text-uppercase"></input>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        </div>
                        <div className="form-group">
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                            <div className='col-sm-2 col-md-2 col-lg-2'>Apellidos:</div>
                            <div className="col-sm-8 col-md-8 col-lg-6">
                                <input id="fname" name="name" type="text" placeholder="Gomez Bolaños" class="form-control text-uppercase"></input>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        </div>
                    </div>
                        <div className="form-group">
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                            <div className='col-sm-2 col-md-2 col-lg-2'>Rut:</div>
                            <div className="col-sm-8 col-md-8 col-lg-6">
                                <input id="fname" name="name" type="text" placeholder="11111111-1" class="form-control text-uppercase"></input>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        </div>
                        <div className="form-group">
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                            <div className='col-sm-2 col-md-2 col-lg-2'>Email:</div>
                            <div className="col-sm-8 col-md-8 col-lg-6">
                                <input id="fname" name="name" type="text" placeholder="email@dominio.cl" class="form-control text-uppercase"></input>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        </div>
                        <div className="form-group">
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                            <div className='col-sm-2 col-md-2 col-lg-2'>teléfono:</div>
                            <div className="col-sm-8 col-md-8 col-lg-6">
                                <input id="fname" name="name" type="text" placeholder="56991231234" class="form-control text-uppercase"></input>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn-medium">Registrar</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegistrarClientes
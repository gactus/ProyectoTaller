import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function RegistrarVehiculoCliente({id}){
    const [patenteVehiculo, setPatente] = useState("");
    const [marcaVehiculo, setMarca] = useState("");
    const [modeloVehiculo, setModelo] = useState("");
    const [marcasList, setMarcas] = useState([]);
    const [modelosList, setModelos] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        listarMarcas();
    }, []);

    const limpiarCampos = () => {
        setPatente("");
        setMarca("");
        setModelo("");
      };
/*  Listo las marcas */
    const listarMarcas = async() =>{
        await Axios.get("http://localhost:8010/api/marcas/",{headers: {'Authorization': token,},})
        .then((response) => {setMarcas(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de marcas:", error.response);});
    };
    const listarModelos = async(idMarca) =>{
        await Axios.get("http://localhost:8010/api/modelos/marca/" + idMarca,{headers: {'Authorization': token,},})
        .then((response) => {setModelos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de marcas:", error.response);});
    };
/*  Fin */
    const registrarVehiculo = async() => {
        const datosVehiculo = {
            patente: patenteVehiculo,
            marca: marcaVehiculo,
            modelo: modeloVehiculo
        }
        await Axios.post("http://localhost:8010/api/usuarios",datosVehiculo,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            limpiarCampos();
            Swal.fire({title: "<strong>Atención</strong>",
                html:"<i>El usuario fue registrado con éxito!!</i>",
                icon: "success",
                timer: 3000,
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Atención: Hubo un problema al registrar al usuario</i>" + error.response,
                icon: "error",
                timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
    return(
    <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-car'></span>&nbsp;Asociar Vehiculo</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="patente" name="patente" type="text" placeholder="PATENTE" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setPatente(event.target.value);}} required maxLength={6}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'>
                            <span className="textosNormal">Ej.: GKSB78</span>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-car"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <select className="textosSelect textosNormal text-uppercase" onChange={(event) => {setMarca(event.target.value);listarModelos(event.target.value)}}
                                    aria-label="Dropdown" aria-describedby="select-addon1">
                                    <option value="">--SELECCIONE--</option>
                                    {marcasList.map((val) => {
                                        return (
                                            <option value={val.idMarca} key={val.idMarca}>{val.nombreMarca}</option>
                                        );
                                    })}
                                </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-cog"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <select className="textosSelect textosNormal text-uppercase" onChange={(event) => {setModelo(event.target.value);}}
                                    aria-label="Dropdown" aria-describedby="select-addon1">
                                    <option value="">--SELECCIONE--</option>
                                    {modelosList.map((val) => {
                                        return (
                                            <option value={val.idModelo} key={val.idModelo}>{val.nombreModelo}</option>
                                        );
                                    })}
                                </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center espaciadoVertical">
                            <button type="submit" className="btn-agregar" onClick={registrarVehiculo}><span className="fa fa-floppy-o"></span>&nbsp;Registrar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegistrarVehiculoCliente
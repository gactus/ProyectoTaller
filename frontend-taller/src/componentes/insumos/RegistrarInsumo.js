import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function RegistrarInsumo(){
    const [codigoInsumo, setCodigo] = useState("");
    const [descripcionInsumo, setDescripcion] = useState("");
    const [cantidadInsumo, setCantidad] = useState(0);
    const [precioCompra, setPrecioCompra] = useState(0);
    const [precioVenta, setPrecioVenta] = useState(0);
    const [tipoInsumo, setIdtipoInsumo] = useState(0);
    const [tipoInsumosList, setTipoInsumos] = useState([]);
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(true);
    useEffect(() => {
        listaTipoInsumos();
    }, []);
/* Listado de Tipos de insumos */
    const listaTipoInsumos = async() =>{
        await Axios.get("http://localhost:8010/api/tipoInsumos",{headers: {'Authorization': token,},})
        .then((response) => {setTipoInsumos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de bancos:", error.response);});
    };
/* Registramos nuestro Insumo */
    const registrarInsumo = async() => {
        const datosInsumo = {
            codigoInsumo: codigoInsumo,
            descripcion: descripcionInsumo,
            idTipoInsumo: tipoInsumo
        }
        console.log(datosInsumo);
        await Axios.post("http://localhost:8010/api/insumos",datosInsumo,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            setShow(false);
            Swal.fire({title: "<strong>Atención</strong>",
                html:"<i>El Insumo fue registrado con éxito!!</i>",
                icon: "success",
                timer: 3000,
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Atención: Hubo un problema al registrar el Insumo</i>",
                icon: "error",
                timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
    return(
    <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-cubes'></span>&nbsp;Registrar Insumos</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-barcode"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="codigo" name="codigo" type="text" placeholder="Código" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setCodigo(event.target.value);}} required/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-info-circle"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="fname" name="name" type="text" placeholder="Descripción" className="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setDescripcion(event.target.value);}} required/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-flask"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                        <select className="textosSelect textosNormal" onChange={(event) => {setIdtipoInsumo(event.target.value);}}
                                aria-label="Dropdown" aria-describedby="select-addon1">
                                <option value="">--SELECCIONE--</option>
                                {tipoInsumosList.map((val) => {
                                    return (
                                        <option value={val.id} key={val.id}>{val.descripcion}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="btn-agregar" onClick={registrarInsumo}><span className="fa fa-floppy-o"></span>&nbsp;Guardar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegistrarInsumo
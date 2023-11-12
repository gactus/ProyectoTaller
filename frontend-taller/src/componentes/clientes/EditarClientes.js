import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function EditarClientes({id, listaClientes}){
    const [idCliente, setId] = useState("");
    const [rutCliente, setRut] = useState("");
    const [nombresCliente, setNombres] = useState("");
    const [apellidosCliente, setApellidos] = useState("");
    const [emailCliente, setEmail] = useState("");
    const [telefonocliente, setTelefono] = useState("");
    const [estadoCliente, setEstado] = useState(false);
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(true);


    useEffect(() => {
        getDatosCliente()
        return () =>{
        }
    },[]);
    const getDatosCliente = async () => {
        await Axios.get("http://localhost:8010/api/clientes/" + id,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then((response) => {
            setId(response.data.idCliente)
            setRut(response.data.rutCliente)
            setNombres(response.data.nombreCliente)
            setApellidos(response.data.apellidoCliente)
            setEmail(response.data.emailCliente)
            setTelefono(response.data.telefonoCliente)
            setEstado(response.data.estadoCliente)
        })
        .catch((error) => {
            console.error("Atención: Hubo un problema al recuperar los datos del cliente.")
        });
    };
    const editarCliente = async () =>{
        const datosCliente = {
            id: idCliente,
            rut: rutCliente,
            nombres: nombresCliente,
            apellidos: apellidosCliente,
            telefono: telefonocliente,
            email: emailCliente
        }
        await Axios.put("http://localhost:8010/api/clientes/" + id,datosCliente,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            setShow(false);
            Swal.fire({
                title: "<strong>Actualizado</strong>",
                html: "<i>Atención: El registro fue actualizado con éxito</i>",
                icon: "success",
                timer: 3000,});
        })
        .catch((error) => {
            Swal.fire({
            title: "<strong>Error</strong>",
            html: "<i>Atención: Hubo un problema al registrar el proveedor</i>",
            icon: "error",
            timer: 3000,});
            console.error("Hubo un error al registrar:", error.response);
        });
    }
    return(
        <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-address-book'></span>&nbsp;Editar Cliente</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="fname" name="name" type="text" placeholder="Nombres" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setNombres(event.target.value);}} required maxLength={30} value={nombresCliente}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'>
                            <input id="fname" name="name" type="text" placeholder="Apellidos" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setApellidos(event.target.value);}} required maxLength={30} value={apellidosCliente}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-id-card-o"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="rut" name="rut" type="text" placeholder="Rut" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setRut(event.target.value);}} maxLength={11} value={rutCliente}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'><span className="textos">Ej.: 11111111-1</span></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="email" name="email" type="text" placeholder="email@dominio.cl" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setEmail(event.target.value);}} maxLength={30} value={emailCliente}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="fname" name="name" type="text" placeholder="56991231234" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setTelefono(event.target.value);}} maxLength={11} value={telefonocliente}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-check"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input type="checkbox" value={estadoCliente} onChange={(event) => {setEstado(event.target.value);}}></input>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="btn-agregar" onClick={()=>{editarCliente()}}>
                                <span className="textosNormal"><span className="fa fa-floppy-o"></span>&nbsp;Actualizar</span>
                            </button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditarClientes
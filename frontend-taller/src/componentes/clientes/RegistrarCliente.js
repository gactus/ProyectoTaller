import React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function RegistrarClientes(){
    const [trabajosList, setTrabajos] = useState([]);
    const [nombresCliente, setNombres] = useState("");
    const [apellidosCliente, setApellidos] = useState("");
    const [rutCliente, setRut] = useState("");
    const [emailCliente, setEmail] = useState("");
    const [telefonocliente, setTelefono] = useState("");
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(true);


    useEffect(() => {
        //registrarCliente();
    }, []);

    const limpiarCampos = () => {
        setRut("");
        setNombres("");
        setApellidos("");
        setTelefono("");
        setEmail("");
        setRut("");
      };

    const registrarCliente = async() => {
        const datosCliente = {
            rut: rutCliente,
            nombres: nombresCliente,
            apellidos: apellidosCliente,
            telefono: telefonocliente,
            email: emailCliente,
        }
        console.log(datosCliente)
        await Axios.post("http://localhost:8010/api/clientes",datosCliente,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            limpiarCampos();
            setShow(false);
            Swal.fire({
            title: "<strong>Registrado con Existo!!</strong>",
            html:
                "<i>El Proveedor fue Registrado con Existo!!</i>",
            icon: "success",
            timer: 3000,
            });
        })
        .catch((error) => {
            Swal.fire({
            title: "<strong>Error</strong>",
            html:
                "<i>Atención: Hubo un problema al registrar el proveedor</i>",
            icon: "error",
            timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
    return(
        <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-address-book'></span>&nbsp;Registrar Cliente</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="fname" name="name" type="text" placeholder="Nombres" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setNombres(event.target.value);}} required/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'>
                            <input id="fname" name="name" type="text" placeholder="Apellidos" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setApellidos(event.target.value);}} required/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-id-card-o"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="rut" name="rut" type="text" placeholder="Rut" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setRut(event.target.value);}} maxLength={11}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'><span className="textos">Ej.: 11111111-1</span></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="email" name="email" type="text" placeholder="email@dominio.cl" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setEmail(event.target.value);}}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="fname" name="name" type="text" placeholder="56991231234" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setTelefono(event.target.value);}}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="botonAccion" onClick={registrarCliente}><h5><span className="fa fa-floppy-o"></span></h5>&nbsp;REGISTRAR</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegistrarClientes
import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function RegistrarProveedor(){
    const [razonSocial, setRazonSocial] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [rut, setRut] = useState("");
    const [banco, setBanco] = useState("");
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [id, setId] = useState();
    const [bancosList, setBancos] = useState([]);
    const [tipoCuentasList, setTipoCuentas] = useState([]);
    const [editar, setEditar] = useState(false);
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(true);


    useEffect(() => {
        listarBancos();
        listarTipoCuentas();
    }, []);

    const limpiarCampos = () => {
        setRut("");
        setRazonSocial("");
        setDireccion("");
        setTelefono("");
        setEmail("");
        setRut("");
      };
  /* Obtenemos los datos Bancarios */
    const listarBancos = async() =>{
        await Axios.get("http://localhost:8010/api/bancos",{headers: {'Authorization': token,},})
        .then((response) => {setBancos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de bancos:", error.response);});
    };
    const listarTipoCuentas = async() =>{
    await Axios.get("http://localhost:8010/api/tipoCuentas",{headers: {'Authorization': token,},})
    .then((response) => {setTipoCuentas(response.data);})
    .catch((error) => {console.error("Hubo un error al obtener la lista de Tipo de Cuentas Bancarias:", error.response);});

    };
  /* Fin */

    const registrarProveedor = async() => {
        const datosProveedor = {
            rut: rut,
            razonSocial: razonSocial,
            direccion: direccion,
            telefono: telefono,
            email: email,
            numeroCuenta: numeroCuenta,
            idBanco: banco,
            idTipoCuenta: tipoCuenta,
        }
        await Axios.post("http://localhost:8010/api/proveedores",datosProveedor,{headers:{'Content-Type':'application/json','Authorization': token}})
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
            <h3><span className='fa fa-address-book'></span>&nbsp;Registrar Proveedor</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="razonSocial" name="razonSocial" type="text" placeholder="Razón Social" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setRazonSocial(event.target.value);}} required/>
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
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa fa-building"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="direccion" name="direccion" type="text" placeholder="Dirección" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setDireccion(event.target.value);}}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="email" name="email" type="text" placeholder="Email" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setEmail(event.target.value);}}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="telefono" name="telefono" type="text" placeholder="56991231234" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setTelefono(event.target.value);}}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-university"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <select className="textosSelect textosNormal" onChange={(event) => {setBanco(event.target.value);}}
                                aria-label="Dropdown" aria-describedby="select-addon1">
                                <option value="">--SELECCIONE--</option>
                                {bancosList.map((val) => {
                                    return (
                                        <option value={val.idBanco} key={val.idBanco}>{val.nombreBanco}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-money"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="telefono" name="telefono" type="text" placeholder="Nº Cuenta" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setNumeroCuenta(event.target.value);}}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'><span className="textos">Ej.: 00001234566</span></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-briefcase"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <select className="textosSelect textosNormal" onChange={(event) => {setTipoCuenta(event.target.value);}}
                                aria-label="Dropdown" aria-describedby="tipoCuenta">
                                <option value="">--SELECCIONE--</option>
                                {tipoCuentasList.map((val) => {
                                    return (
                                        <option value={val.idTipoCuenta} key={val.idTipoCuenta}>{val.tipoCuenta}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="botonAccion" onClick={registrarProveedor}><h5><span className="fa fa-floppy-o"></span></h5>&nbsp;REGISTRAR</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegistrarProveedor
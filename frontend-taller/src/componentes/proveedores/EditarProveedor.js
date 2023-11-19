import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function EditarProveedor({id}){
    const [razonSocial, setRazonSocial] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [rut, setRut] = useState("");
    const [idBanco, setBanco] = useState(0);
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [idTipoCuenta, setTipoCuenta] = useState(0);
    const [idProveedor, setIdProveedor] = useState();
    const [bancosList, setBancos] = useState([]);
    const [tipoCuentasList, setTipoCuentas] = useState([]);
    const [estado, setEstado] = useState(false);
    const token = localStorage.getItem('token');


    useEffect(() => {
        listarBancos();
        listarTipoCuentas();
        getDatosProveedor();
        return () =>{
        }
    }, []);
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
  /* Obtengo los datos del proveedor */
  const getDatosProveedor = async () => {
    await Axios.get("http://localhost:8010/api/proveedores/" + id,{headers:{'Content-Type':'application/json','Authorization': token}})
    .then((response) => {
        setIdProveedor(response.data.idProveedor)
        setRut(response.data.rutProveedor)
        setRazonSocial(response.data.razonSocial)
        setDireccion(response.data.direccionProveedor)
        setEmail(response.data.emailProveedor)
        setTelefono(response.data.telefonoProveedor)
        setBanco(response.data.idBanco)
        setNumeroCuenta(response.data.numeroCuenta)
        setTipoCuenta(response.data.idTipoCuenta)
    })
    .catch((error) => {
        console.error("Atención: Hubo un problema al recuperar los datos del proveedor.")
    });
};
/*  Editamos al proveedor */
    const editarProveedor = async() => {
        const datosProveedor = {
            rut: rut, razonSocial: razonSocial, direccion: direccion,
            telefono: telefono, email: email, numeroCuenta: numeroCuenta, idBanco: idBanco,
            idTipoCuenta: idTipoCuenta,
        }
        await Axios.put("http://localhost:8010/api/proveedores/" + id,datosProveedor,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            Swal.fire({
            title: "<strong>Antención!!</strong>",
            html: "<i>El Proveedor fue actualizado con éxito!!</i>",
            icon: "success", timer: 3000,
            });
        })
        .catch((error) => {Swal.fire({
            title: "<strong>Antención!!</strong>",
            html: "<i>Atención: Hubo un problema al actualizar al proveedor</i>",
            icon: "error", timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
/* Fin */
    return(
        <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-address-book'></span>&nbsp;Editar Proveedor</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="razonSocial" name="razonSocial" type="text" placeholder="Razón Social" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setRazonSocial(event.target.value);}} required maxLength={100} value={razonSocial}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-id-card-o"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="rut" name="rut" type="text" placeholder="Rut" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setRut(event.target.value);}} maxLength={11} value={rut}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'><span className="textos">Ej.: 11111111-1</span></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa fa-building"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="direccion" name="direccion" type="text" placeholder="Dirección" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setDireccion(event.target.value);}} maxLength={100} value={direccion}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="email" name="email" type="text" placeholder="Email" class="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setEmail(event.target.value);}} maxLength={100} value={email}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="telefono" name="telefono" type="text" placeholder="56991231234" class="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setTelefono(event.target.value);}} maxLength={11} value={telefono}/>
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
                                        <option value={val.idBanco} key={val.idBanco} selected={val.idBanco === idBanco ? 'selected' : ''}>{val.nombreBanco}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-credit-card-alt"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="telefono" name="telefono" type="text" placeholder="Nº Cuenta" class="textosNormal textosCajas text-uppercase"
                            onChange={(event) => {setNumeroCuenta(event.target.value);}} maxLength={12} value={numeroCuenta}/>
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
                                        <option value={val.idTipoCuenta} key={val.idTipoCuenta} selected={val.idTipoCuenta === idTipoCuenta ? 'selected' : ''}>{val.tipoCuenta}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="botonAccion" onClick={editarProveedor}><h5><span className="fa fa-refresh"></span></h5>&nbsp;Actualizar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditarProveedor
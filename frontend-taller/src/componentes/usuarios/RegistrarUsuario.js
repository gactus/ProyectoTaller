import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function RegistrarUsuario(){
    const [nombreUsuario, setNombres] = useState("");
    const [apellidosUsuario, setApellidos] = useState("");
    const [rutUsuario, setRut] = useState("");
    const [emailUsuario, setEmail] = useState("");
    const [telefonoUsuario, setTelefono] = useState("");
    const [idTipoPerfil, setTipoPerfil] = useState("");
    const [tipoPerfilesList, setTipoPerfiles] = useState([]);
    const [contrasenaUsuario, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmar] = useState("");
    const token = localStorage.getItem('token');

    useEffect(() => {
        listarTipoPerfiles();
    }, []);

    const limpiarCampos = () => {
        setRut("");
        setNombres("");
        setApellidos("");
        setTelefono("");
        setEmail("");
        setRut("");
      };
/*  Listo los tipos de Perfiles */
    const listarTipoPerfiles = async() =>{
        await Axios.get("http://localhost:8010/api/tipoPerfil",{headers: {'Authorization': token,},})
        .then((response) => {setTipoPerfiles(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de Tipo de Cuentas Bancarias:", error.response);});
    };
/*  Fin */
    const registrarUsuario = async() => {
        const datosUsuario = {
            rut: rutUsuario, nombres: nombreUsuario, apellidos: apellidosUsuario,
            telefono: telefonoUsuario, email: emailUsuario, idTipoPerfil: idTipoPerfil,
            contrasenaUsuario: contrasenaUsuario
        }
        console.log(datosUsuario)
        await Axios.post("http://localhost:8010/api/usuarios",datosUsuario,{headers:{'Content-Type':'application/json','Authorization': token}})
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
            <h3><span className='fa fa-address-book'></span>&nbsp;Nuevo Usuario</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="fname" name="name" type="text" placeholder="Nombres" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setNombres(event.target.value);}} required maxLength={50}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'>
                            <input id="fname" name="name" type="text" placeholder="Apellidos" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setApellidos(event.target.value);}} required maxLength={50}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-id-card-o"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="rut" name="rut" type="text" placeholder="Rut" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setRut(event.target.value);}} maxLength={11}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'><span className="textos">Ej.: 11111111-1</span></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="email" name="email" type="text" placeholder="email@dominio.cl" className="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setEmail(event.target.value);}} maxLength={100}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="fname" name="name" type="text" placeholder="56991231234" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setTelefono(event.target.value);}} maxLength={11}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <select className="textosSelect textosNormal text-uppercase" onChange={(event) => {setTipoPerfil(event.target.value);}}
                                    aria-label="Dropdown" aria-describedby="select-addon1">
                                    <option value="">--SELECCIONE--</option>
                                    {tipoPerfilesList.map((val) => {
                                        return (
                                            <option value={val.idPerfil} key={val.idPerfil}>{val.nombrePerfil}</option>
                                        );
                                    })}
                                </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-lock"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="contrasena" name="contrasena" type="password" placeholder="Contraseña" className="textosCajas textosNormal text-uppercase"
                                onChange={(event) => {setContrasena(event.target.value);}} maxLength={16}/> 
                            </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-unlock-alt"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="confirmarContrasena" name="confirmarContrasena" type="password" placeholder="Confirmar Contraseña" className="textosCajas textosNormal text-uppercase"
                                onChange={(event) => {setConfirmar(event.target.value);}} maxLength={16}/>
                            </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="botonAccion" onClick={registrarUsuario}><h5><span className="fa fa-floppy-o"></span></h5>&nbsp;REGISTRAR</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default RegistrarUsuario
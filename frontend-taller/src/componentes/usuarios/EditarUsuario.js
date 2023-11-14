import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function EditarUsuario({id}){
    const [idPersona, setIdPersona] = useState("");
    const [nombreUsuario, setNombres] = useState("");
    const [apellidosUsuario, setApellidos] = useState("");
    const [rutUsuario, setRut] = useState("");
    const [emailUsuario, setEmail] = useState("");
    const [telefonoUsuario, setTelefono] = useState("");
    const [idTipoPerfil, setTipoPerfil] = useState(0);
    const [tipoPerfilesList, setTipoPerfiles] = useState([]);
    const [contrasenaUsuario, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmar] = useState("");
    const [estado, setEstado] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        listarTipoPerfiles();
        getDatosUsuario();
        return () =>{
        }
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
/* Obtengo los datos del Cliente */
const getDatosUsuario = async () => {
    await Axios.get("http://localhost:8010/api/usuarios/" + id,{headers:{'Content-Type':'application/json','Authorization': token}})
    .then((response) => {
        setIdPersona(response.data.idPersona)
        setRut(response.data.rutUsuario)
        setNombres(response.data.nombreUsuario)
        setApellidos(response.data.apellidoUsuario)
        setEmail(response.data.emailUsuario)
        setTelefono(response.data.telefonoUsuario)
        setTipoPerfil(response.data.idTipoPerfil)
        setEstado(response.data.estadoUsuario)
    })
    .catch((error) => {
        console.error("Atención: Hubo un problema al recuperar los datos del Usuario.")
    });
};
/*  Fin */
    const editarUsuario = async() => {
        const datosUsuario = {
            rut: rutUsuario, nombres: nombreUsuario, apellidos: apellidosUsuario,
            telefono: telefonoUsuario, email: emailUsuario, idTipoPerfil: idTipoPerfil,
            contrasenaUsuario: contrasenaUsuario, estado: true
        }
        await Axios.put("http://localhost:8010/api/usuarios/" + idPersona,datosUsuario,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            limpiarCampos();
            Swal.fire({title: "<strong>Atención</strong>",
                html:"<i>El usuario fue actualizado con éxito!!</i>",
                icon: "success",
                timer: 3000,
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Atención: Hubo un problema al actualizar al usuario</i>",
                icon: "error",
                timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
    return(
    <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-address-book'></span>&nbsp;Editar Usuario</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="fname" name="name" type="text" placeholder="Nombres" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setNombres(event.target.value);}} required maxLength={50} value={nombreUsuario}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'>
                            <input id="fname" name="name" type="text" placeholder="Apellidos" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setApellidos(event.target.value);}} required maxLength={50} value={apellidosUsuario}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-id-card-o"></span></span></div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <input id="rut" name="rut" type="text" placeholder="Rut" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setRut(event.target.value);}} maxLength={11} readOnly value={rutUsuario}/>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'><span className="textos">Ej.: 11111111-1</span></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-envelope"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="email" name="email" type="text" placeholder="email@dominio.cl" className="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setEmail(event.target.value);}} maxLength={100} value={emailUsuario}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-phone-square"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="fname" name="name" type="text" placeholder="56991231234" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setTelefono(event.target.value);}} maxLength={11} value={telefonoUsuario}/>
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
                            <button type="submit" className="botonAccion" onClick={editarUsuario}><h5><span className="fa fa-refresh"></span></h5>&nbsp;Actualizar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditarUsuario
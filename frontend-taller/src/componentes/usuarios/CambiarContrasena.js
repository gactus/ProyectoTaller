import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";

function CambiarContrasena(){
    const [contrasenaUsuario, setContrasenaUsuario] = useState([]);
    const [confirmarContrasena, setConfirmarContrasena] = useState([]);
    const token = localStorage.getItem('token');
    return(
    <div className='card'>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-3 col-md-3 col-lg-3'></div>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-lock"></span>&nbsp;Nueva Contraseña:</span></div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <input id="fname" name="name" type="password" placeholder="Contraseña" class="textosCajas textosNormal"
                            onChange={(event) => {setContrasenaUsuario(event.target.value);}} required maxLength={16}/>
                        </div>
                        <div className='col-sm-3 col-md-3 col-lg-3'></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-3 col-md-3 col-lg-3'></div>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-unlock-alt"></span>&nbsp;Confirmar Contraseña:</span></div>
                        <div className='col-sm-4 col-md-4 col-lg-4'>
                            <input id="fname" name="name" type="password" placeholder="Confirmar" class="textosCajas textosNormal"
                            onChange={(event) => {setConfirmarContrasena(event.target.value);}} required maxLength={16}/>
                        </div>
                        <div className='col-sm-3 col-md-3 col-lg-3'></div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-5 col-md-5 col-lg-5'></div>
                        <div className="col-sm-2 col-md-2 col-lg-2 text-center">
                            <button type="submit" className="botonAccion" ><h5><span className="fa fa-refresh"></span></h5>&nbsp;Actualizar</button>
                        </div>
                        <div className='col-sm-5 col-md-5 col-lg-5'></div>
                    </div>
                </div>
                <div className='row espaciadoVertical'>
                    <div className='col-sm-4 col-md-4 col-lg-4'></div>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <li className="textosNormal">La contraseña debe tener un mínimo de 10 carácteres.</li>
                        <li className="textosNormal">La contraseña debe contener al menos una letra mayúscula.</li>
                        <li className="textosNormal">La contraseña debe contener al menos una letra minúscula.</li>
                        <li className="textosNormal">La contraseña debe contener al menos un número.</li>
                        <li className="textosNormal">La contraseña debe contener al menos un simbolo.</li>
                    </div>
                    <div className='col-sm-4 col-md-4 col-lg-4'></div>
                </div>
            </div>
        </div> 
    </div>
    )
}

export default CambiarContrasena

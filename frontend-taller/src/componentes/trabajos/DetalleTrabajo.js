import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";

function DetalleTrabajo({id}){
    const token = localStorage.getItem('token');
    const [detalleTrabajo, setDetalleTrabajo] = useState("");
    const [fechaTrabajo, setFechaTrabajo] = useState("");
    const [proximaMantencion, setProximaMantención] = useState("");
    const [requiereNotificacion, setRequiereNotificacion] = useState(false);
    const [costoManoObra, setCostoManoObra] = useState(0);
    const [costoInsumos, setCostoInsumos] = useState(0);
    const [costoTotal, setCostoTotal] = useState(0);
    const [nombreMecanico, setNombreMecanico] = useState("");
    const [estadoTrabajo, setEstadoTrabajo] = useState("");
    useEffect(() => {
        getDatosTrabajo()
    },[]);
    const getDatosTrabajo = async () => {
        await Axios.get("http://localhost:8010/api/trabajos/" + id,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then((response) => {
            setDetalleTrabajo(response.data.detalleTrabajo)
            setFechaTrabajo(response.data.fechaTrabajo)
            setProximaMantención(response.data.fechaProxMantencion)
            setRequiereNotificacion(response.data.requiereNotificacion)
            setCostoManoObra(response.data.costoManoObra)
            setCostoInsumos(response.data.costoInsumos)
            setCostoTotal(response.data.costoTotal)
            setNombreMecanico(response.data.nombreMecanico)
            setEstadoTrabajo(response.data.estadoTrabajo)
        })
        .catch((error) => {
            console.error("Atención: Hubo un problema al recuperar los datos del cliente.")
        });
    };
    return(
        <div className='card'>
            <div className='card-header'>
                <h3><span className='fa fa-wrench'></span>&nbsp;Detalle del Trabajo</h3>
            </div>
            <div className='card-body'>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className='row espaciadoVertical'>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <span className="textosNormal">{detalleTrabajo}</span>
                            </div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-calendar"></span>&nbsp;Fecha:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">{fechaTrabajo}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-calendar"></span>&nbsp;Prox. Mantención:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">{proximaMantencion}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-envelope"></span>&nbsp;Req. Notificación:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">{requiereNotificacion}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-money"></span>&nbsp;Costo Mano Obra:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">$ {costoManoObra}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-money"></span>&nbsp;Costo Insumos:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">$ {costoInsumos}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-money"></span>&nbsp;Costo Total:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">$ {costoTotal}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-user"></span>&nbsp;Realizado Por:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">{nombreMecanico}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-5 col-md-5 col-lg-5 text-left'><span className="textos"><span className="fa fa-info-circle"></span>&nbsp;Estado:</span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <span className="textosNormal">{estadoTrabajo}</span>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetalleTrabajo
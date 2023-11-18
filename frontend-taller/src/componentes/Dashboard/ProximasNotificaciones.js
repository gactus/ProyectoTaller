import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";

function ProximasNotificaciones(){
    const [getTrabajosNotificar, setTrabajosNotificar] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        dashBoardNotificaciones();
    }, []);
    const dashBoardNotificaciones = async() =>{
        await Axios.get("http://localhost:8010/api/datosDashBoard/notificaciones",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajosNotificar(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener el conteo de trabajos:", error.response);});
    };
    return(
        <div className="row espaciado">
            <div className="col-sm-12 col-md-12 col-lg-12"></div>
            <div className='card'>
                <div className='card-header'>
                   <span className='fa fa-envelope textos'></span>&nbsp;Prox. Notificaciones
                </div>
                <div className='card-body'>
                    <span className="text-center">
                        <h1>
                        {getTrabajosNotificar.map((val) => {
                            return (
                                <span key="1">
                                    {val.totalRegistros}
                                </span>
                                );
                            })}
                        </h1>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default ProximasNotificaciones
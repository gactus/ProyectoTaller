import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";

function TrabajosFinalizados(){
    const [getTrabajos, setTrabajos] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        dashboardTrabajos();
    }, []);
    const dashboardTrabajos = async() =>{
        await Axios.get("http://localhost:8010/api/datosDashboard/trabajos/3" ,{headers: {'Authorization': token,},})
        .then((response) => {setTrabajos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener el conteo de trabajos:", error.response);});
    };
    return(
        <div className="row espaciado">
            <div className="col-sm-12 col-md-12 col-lg-12"></div>
            <div className='card'>
                <div className='card-header'>
                    <span className='fa fa-check'></span>&nbsp;Trabajos Finalizados
                </div>
                <div className='card-body'>
                    <span className="text-center">
                        <h1>
                        {getTrabajos.map((val) => {
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
export default TrabajosFinalizados
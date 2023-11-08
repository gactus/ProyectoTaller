import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";

function TrabajosEspera(){
    const [getTrabajosEspera, setTrabajosEspera] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        trabajosEspera();
    }, []);
    const trabajosEspera = async() =>{
        await Axios.get("http://localhost:8010/api/datosDashboard/trabajos/2",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajosEspera(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener el conteo de trabajos", error.response);});
    };
    return(
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12"></div>
            <div className='card'>
                <div className='card-header'>
                    <span className='fa fa fa-hourglass-end'></span>&nbsp;En Espera de Insumos
                </div>
                <div className='card-body'>
                    <span className="text-center">
                        <h1>
                        {getTrabajosEspera.map((val) => {
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
export default TrabajosEspera
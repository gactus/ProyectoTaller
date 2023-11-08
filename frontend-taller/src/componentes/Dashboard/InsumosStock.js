import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";

function InsumosStock(){
    const [getStock, setStock] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        stockInsumos();
    }, []);
    const stockInsumos = async() =>{
        await Axios.get("http://localhost:8010/api/datosDashBoard/insumos/",{headers: {'Authorization': token,},})
        .then((response) => {setStock(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener el conteo de insumos:", error.response);});
    };
    return(
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                {getStock.map((val) => {
                    return (
                        val.totalRegistros < 10 ? 
                            <div className="row">
                                <div className="col-sm-3 col-md-3 col-lg-3"></div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="alert alert-danger">
                                        <h4><span className="text-danger"><strong>Atención:</strong> Existen {val.totalRegistros} insumos con bajo stock!</span></h4>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3"></div>
                            </div> : ""
                        );
                    })}
            </div>
        </div>
    )
}
export default InsumosStock
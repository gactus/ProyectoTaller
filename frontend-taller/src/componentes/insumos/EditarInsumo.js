import React from "react";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";

function EditarInsumo({id}){
    const [codigoInsumo, setCodigo] = useState("");
    const [descripcionInsumo, setDescripcion] = useState("");
    const [tipoInsumo, setIdtipoInsumo] = useState(0);
    const [tipoInsumosList, setTipoInsumos] = useState([]);
    const [estadoInsumo, setEstado] = useState(false);
    const token = localStorage.getItem('token');
    useEffect(() => {
        listaTipoInsumos();
        getDatosInsumo();
        return () =>{
        }
    }, []);
/* Listado de Tipos de insumos */
    const listaTipoInsumos = async() =>{
        await Axios.get("http://localhost:8010/api/tipoInsumos",{headers: {'Authorization': token,},})
        .then((response) => {setTipoInsumos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de bancos:", error.response);});
    };
/* Obtengo los datos del Insumo */
  /* Obtengo los datos del proveedor */
  const getDatosInsumo = async () => {
    await Axios.get("http://localhost:8010/api/insumos/" + id,{headers:{'Content-Type':'application/json','Authorization': token}})
    .then((response) => {
        setCodigo(response.data.codigoInsumo)
        setDescripcion(response.data.nombreInsumo)
        setIdtipoInsumo(response.data.idTipoInsumo)
        setEstado(response.data.estadoInsumo)
    })
    .catch((error) => {
        console.error("Atención: Hubo un problema al recuperar los datos del proveedor.")
    });
};
/* Registramos nuestro Insumo */
    const editarInsumo = async() => {
        const datosInsumo = {
            codigoInsumo: codigoInsumo,
            descripcion: descripcionInsumo,
            idTipoInsumo: tipoInsumo,
            estado: estadoInsumo
        }
        console.log(datosInsumo);
        await Axios.put("http://localhost:8010/api/insumos/" + id,datosInsumo,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then(() => {
            Swal.fire({title: "<strong>Atención</strong>",
                html:"<i>El Insumo fue registrado con éxito!!</i>",
                icon: "success",
                timer: 3000,
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Atención: Hubo un problema al registrar el Insumo</i>",
                icon: "error",
                timer: 3000,
            });
            console.error("Hubo un error al registrar:", error.response);
        });
    };
    return(
    <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-cubes'></span>&nbsp;Editar Insumos</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-barcode"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="codigo" name="codigo" type="text" placeholder="Código" className="textosCajas textosNormal text-uppercase"
                            onChange={(event) => {setCodigo(event.target.value);}} required value={codigoInsumo}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-info-circle"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="fname" name="name" type="text" placeholder="Descripción" className="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setDescripcion(event.target.value);}} required value={descripcionInsumo}/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-flask"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                        <select className="textosSelect textosNormal" onChange={(event) => {setIdtipoInsumo(event.target.value);}}
                                aria-label="Dropdown" aria-describedby="select-addon1">
                                <option value="">--SELECCIONE--</option>
                                {tipoInsumosList.map((val) => {
                                    return (
                                        <option value={val.id} key={val.id} selected={val.id === tipoInsumo ? 'selected' : ''}>{val.descripcion}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-toggle-on"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                        <select className="textosSelect textosNormal" onChange={(event) => {setEstado(event.target.value);}}
                                aria-label="Dropdown" aria-describedby="select-addon1">
                                <option value="true" key={1} selected={estadoInsumo ? 'selected' : ''}>Activo</option>
                                <option value="false" key={2} selected={!estadoInsumo ? 'selected' : ''}>Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="btn-agregar" onClick={editarInsumo}><h5><span className="fa fa-refresh"></span></h5>&nbsp;Actualizar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default EditarInsumo
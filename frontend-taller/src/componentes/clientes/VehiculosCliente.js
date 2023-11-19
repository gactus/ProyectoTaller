import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";
import Swal from "sweetalert2";
import notificaAccion from "../validaciones/Validaciones"

function VehiculosCliente({id}){
    const [vehiculosList, setVehiculos] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");;
    const [patenteVehiculo, setPatente] = useState("");
    const [marcaVehiculo, setMarca] = useState("");
    const [modeloVehiculo, setModelo] = useState("");
    const [marcasList, setMarcas] = useState([]);
    const [modelosList, setModelos] = useState([]);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Patente",
            accessorKey: 'nroPatente'
        },
        {
            header: "Marca",
            accessorKey: 'marcaVehiculo'
        },
        {
            header: "Modelo",
            accessorKey: 'modeloVehiculo'
        },
        {
            header: "Acción",
            accessorKey: 'idVehiculo',
            cell: (fila) => {
                return (
                    <button className="transparent-button">
                        <span className="textosNormal text-danger"><span className="fa fa-trash"></span></span>
                    </button>
                );
            },
        },
    ]
    useEffect(() => {
        listarVehiculos();
        listarMarcas();
    }, []);
    const listarVehiculos = async() =>{
        await Axios.get("http://localhost:8010/api/vehiculos/usuario/" + id,{headers: {'Authorization': token,},})
        .then((response) => {setVehiculos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de usuarios:", error.response);});
    };
    const limpiarCampos = () => {
        setPatente("");
        setMarca("");
        setModelo("");
      };
/*  Listo las marcas */
    const listarMarcas = async() =>{
        await Axios.get("http://localhost:8010/api/marcas/",{headers: {'Authorization': token,},})
        .then((response) => {setMarcas(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de marcas:", error.response);});
    };
    const listarModelos = async(idMarca) =>{
        await Axios.get("http://localhost:8010/api/modelos/marca/" + idMarca,{headers: {'Authorization': token,},})
        .then((response) => {setModelos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de marcas:", error.response);});
    };
/*  Fin */
    const registrarVehiculo = async() => {
        const datosVehiculo = {
            idPersona: id,
            patenteVehiculo: patenteVehiculo,
            idModelo: modeloVehiculo
        }
        await Axios.post("http://localhost:8010/api/vehiculos",datosVehiculo,{headers:{'Content-Type':'application/json','Authorization': token}})
        .then((response) => {
            limpiarCampos();
            const icono =  (response.data.registroCreado ? "succes" : "error");
            const mensaje = response.data.message;
            Swal.fire({title: "<strong>Atención</strong>",
                html: mensaje,
                icon: icono,
                timer: 3000,
            });
            listarVehiculos();
        })
        .catch((error) => {
            Swal.fire({
                title: "<strong>Error</strong>",
                html: "<i>Atención: Hubo un problema al asociar el vehiculo</i>",
                icon: "error",
                timer: 3000,
            });
            console.error("Hubo un error al registrar:");
        });
    };
    const tabla = useReactTable(
        {
            data: vehiculosList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
            getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            state: {
                sorting,
                globalFilter: filtering
            },
            onSortingChange: setSorting,
            onGlobalFilterChange: setFiltering,
        });
    return(
        <div>
            <div className='card'>
            <div className='card-header'>
                <h3><span className='fa fa-car'></span>&nbsp;Asociar Vehiculo</h3>
            </div>
            <div className='card-body'>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                            <div className="col-sm-5 col-md-5 col-lg-5">
                                <input id="patente" name="patente" type="text" placeholder="PATENTE" className="textosCajas textosNormal text-uppercase"
                                onChange={(event) => {setPatente(event.target.value);}} required maxLength={6}/>
                            </div>
                            <div className='col-sm-5 col-md-5 col-lg-5'>
                                <span className="textosNormal">Ej.: GKSB78</span>
                            </div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-car"></span></span></div>
                            <div className="col-sm-10 col-md-10 col-lg-10">
                                <select className="textosSelect textosNormal text-uppercase" onChange={(event) => {setMarca(event.target.value);listarModelos(event.target.value)}}
                                        aria-label="Dropdown" aria-describedby="select-addon1">
                                        <option value="">--SELECCIONE--</option>
                                        {marcasList.map((val) => {
                                            return (
                                                <option value={val.idMarca} key={val.idMarca}>{val.nombreMarca}</option>
                                            );
                                        })}
                                    </select>
                            </div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-2 col-md-2 col-lg-2 text-left'><span className="textos"><span className="fa fa-cog"></span></span></div>
                            <div className="col-sm-10 col-md-10 col-lg-10">
                                <select className="textosSelect textosNormal text-uppercase" onChange={(event) => {setModelo(event.target.value);}}
                                        aria-label="Dropdown" aria-describedby="select-addon1">
                                        <option value="">--SELECCIONE--</option>
                                        {modelosList.map((val) => {
                                            return (
                                                <option value={val.idModelo} key={val.idModelo}>{val.nombreModelo}</option>
                                            );
                                        })}
                                    </select>
                            </div>
                        </div>
                        <div className='row espaciadoVertical'>
                            <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                            <div className="col-sm-8 col-md-8 col-lg-8 text-center espaciadoVertical">
                                <button type="submit" className="btn-agregar" onClick={registrarVehiculo}><span className="fa fa-floppy-o"></span>&nbsp;Registrar</button>
                            </div>
                            <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <hr/>
                <span className="textos"><span className="fa fa-search"></span>&nbsp;Consultar:</span>&nbsp;
                <input type="text" value={filtering} className="textosCajas textosNormal text-uppercase"
                onChange={e=>setFiltering(e.target.value)}/>
                <table className="table table-hover table-responsive-lg"> 
                    <thead>
                        {
                        tabla.getHeaderGroups().map(headerGroup=> (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header=>(
                                            <th key={header.id} 
                                                onClick={header.column.getToggleSortingHandler()}>
                                                {
                                                    flexRender(header.column.columnDef.header, header.getContext())}
                                                    {
                                                    {
                                                        'asc' : "⬆", 'desc' : "⬇"
                                                    }[header.column.getIsSorted() ?? null]
                                                    }
                                            </th>
                                        ))
                                    }
                                </tr>
                            )) 
                        }
                    </thead>
                    <tbody>
                    {tabla.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="textosNormal">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                    ))}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
        </div>
    )
}

export default VehiculosCliente
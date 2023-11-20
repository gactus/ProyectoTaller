import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";
import { Modal } from 'react-bootstrap';

function ListadoVehiculos(){
    const [vehiculosList, setVehiculos] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [idVehiculo, setIdVehiculo] = useState(0);
    const [filtering, setFiltering] = useState("");
    const [showModal, setShowModal] = useState(false);
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
            header: "Cliente",
            accessorKey: 'nombreDueno'
        },
        {
            header: "Fecha Registro",
            accessorKey: 'fechaRegistro'
        },
        {
            header: "Estado",
            accessorKey: 'estadoVehiculo',
            cell:(fila)=>{
                return(
                    (fila.getValue('estadoVehiculo') ? 
                        <span className="textosNormal"><span className="fa fa-check-circle-o text-success"></span></span> : 
                        <span className="textosNormal"><span className="fa fa-times-circle text-bg-danger"></span></span>
                    )
                )
            }
        },
        {
            header: "Acciones",
            accessorKey: 'idVehiculo',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="transparent-button" >
                                    <span className="textosNormal"><span className="fa fa-pencil-square-o"></span></span>
                                </button>
                            </td>
                            <td>
                                <button className="transparent-button">
                                <span className="textosNormal text-danger"><span className="fa fa-trash"></span></span>
                                </button>
                            </td>
                        </tr>
                    </table>
                );
            },
        },
    ]
    useEffect(() => {
        listarVehiculos();
    }, []);
    const listarVehiculos = async() =>{
        await Axios.get("http://localhost:8010/api/vehiculos/general/",{headers: {'Authorization': token,},})
        .then((response) => {setVehiculos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de vehiculos:", error.response);});
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
            <table align="center">
                <tr>
                    <td><button onClick={()=> tabla.setPageIndex(0)} className="btnPaginadorA"><span className="fa fa-step-backward"></span></button></td>
                    <td><button onClick={()=> tabla.previousPage()} className="btnPaginadorCentral"><span className="fa fa-backward"></span></button></td>
                    <td><button onClick={()=> tabla.nextPage()} className="btnPaginadorCentral"><span className="fa fa-forward"></span></button></td>
                    <td><button onClick={()=> tabla.setPageIndex(tabla.getPageCount()-1)} className="btnPaginadorB"><span className="fa fa-step-forward"></span></button></td>
                </tr>
            </table>
        </div>
    )
}

export default ListadoVehiculos
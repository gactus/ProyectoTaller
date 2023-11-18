import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";  
import { Modal } from 'react-bootstrap';
import Axios from "axios";

function ListadoNotificaciones(){
    const [idTrabajo, setIdTrabajo] = useState();
    const [trabajosNotificarList, setTrabajosNotificar] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Detalle",
            accessorKey: 'detalleTrabajo'
        },
        {
            header: "Fecha Trabajo",
            accessorKey: 'fechaTrabajo'
        },
        {
            header: "Prox.  Mantención",
            accessorKey: 'fechaProxMantencion'
        },
        {
            header: "Nombre Cliente",
            accessorKey: 'nombreCliente'
        },
        {
            header: "Email",
            accessorKey: 'emailCliente'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefonoCliente'
        },
        {
            header: "Nº Patente",
            accessorKey: 'patenteVehiculo'
        },
        {
            header: "Notificar",
            accessorKey: 'idNotificacionTrabajo',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="botonAccion">
                                    <span className="textosNormal"><span className="fa fa-envelope"></span></span>
                                </button>
                            </td>
                        </tr>
                    </table>
                );
            },
        },
    ]
    useEffect(() => {
        listarProveedores();
    }, []);
    const cerrarModal = ()=>{
        listarProveedores();
        setShowModal(false);
    }
    const listarProveedores = async() =>{
        await Axios.get("http://localhost:8010/api/notificacion/trabajos/",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajosNotificar(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener proveedores:", error.response);});
    };
    const tabla = useReactTable(
        {
            data: trabajosNotificarList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal()}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoNotificaciones
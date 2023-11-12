import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";  
import Modal from 'react-bootstrap/Modal'; 
import Axios from "axios";

function ListadoTrabajosDashBoard(){
    const [trabajosList, setTrabajos] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Descripción",
            accessorKey: 'detalleTrabajo'
        },
        {
            header: "Fecha Trabajo",
            accessorKey: 'fechaTrabajo'
        },
        {
            header: "Prox. Mantención",
            accessorKey: 'fechaProxMantencion',
            cell:(fila)=>{
                return(
                    (fila.getValue('fechaProxMantencion') === '01-01-1900' ? "No Requiere" : "")
                )
            }
        },
        {
            header: "Req. Notificación",
            accessorKey: 'requiereNotificacion',
            cell:(fila)=>{
                return(
                    (fila.getValue('idTrabajo') ? "Si" : "NO")
                )
            }
        },
        {
            header: "Costo Trabajo",
            accessorKey: 'costoTotal'
        },
        {
            header: "Mecánico",
            accessorKey: 'nombreMecanico'
        },
        {
            header: "Estado",
            accessorKey: 'estadoTrabajo'
        },
        {
            header: "Revisar",
            accessorKey: 'idTrabajo',
            cell: (fila) => {
                return (
                    <button className="btnVer" onClick={() => detalleTrabajo(fila.getValue('idTrabajo'))}>
                        <span className="fa fa-eye"></span>
                    </button>
                );
            },
        },
    ]
    useEffect(() => {
        listarTrabajos();
    }, []);
    const detalleTrabajo = (idTrabajo)=>{
        setShowModal(true);
    }
    const listarTrabajos = async() =>{
        await Axios.get("http://localhost:8010/api/trabajos/listadoTrabajosAdmin",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    };
    const tabla = useReactTable(
        {
            data: trabajosList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
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
                            <tr key={headerGroup.id} className="textosNormal">
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
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del trabajo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span></span>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoTrabajosDashBoard
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
import EditarTrabajo from "./EditarTrabajo";

function ListadoTrabajos({showList}){
    const [trabajosList, setTrabajos] = useState([]);
    const [datosTrabajo, setDatosTrabajo] = useState([]);
    const [idTrabajo, setIdTrabajo] = useState(0);
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
                    (fila.getValue('fechaProxMantencion') === '01-01-1900' ? "No Requiere" : fila.getValue('fechaProxMantencion'))
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
            accessorKey: 'costoTotal',
            cell:(fila)=>{
                return(
                    ("$ " + fila.getValue('costoTotal'))
                )
            }
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
            header: "Acciones",
            accessorKey: 'idTrabajo',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="transparent-button" onClick={() => editarTrabajo(fila.getValue('idTrabajo'))}>
                                    <span className="textosNormal"><span className="fa fa-pencil-square-o"></span></span>
                                </button>
                            </td>
                            <td>
                                <button className="transparent-button">
                                    <span className="textosNormal text-danger"><span className="fa fa-flask"></span></span>
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
        listarTrabajos();
    }, [showList]);

    const cerrarModal = ()=>{
        listarTrabajos();
        setShowModal(false);
    }
    const editarTrabajo = async(idTrabajo)=>{
        setIdTrabajo(idTrabajo);
        setShowModal(true);
    }
    const listarTrabajos = async() =>{
        await Axios.get("http://localhost:8010/api/trabajos/listadoTrabajosAdmin",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    };
  /*  const desactivarInsumo = async(id)=>{
        await Axios.put("http://localhost:8010/api/insumos/delete/" + id,{headers: {'Authorization': token,},})
        .then((response) => {setDatosTrabajo(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    } */

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
                    <EditarTrabajo id={idTrabajo}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal()}><span className='textosNormal'><span className='fa fa-close'></span>&nbsp;Cerrar</span></button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoTrabajos
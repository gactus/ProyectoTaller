import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";  
import { Modal } from 'react-bootstrap';
import EditarClientes from "./EditarClientes";
import Axios from "axios";
import VehiculosCliente from "./VehiculosCliente";
import RegistrarVehiculoCliente from "./RegistrarVehiculoCliente";

function ListadoClientes({showList}){
    const [clientesList, setClientes] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [idCliente, setIdCliente] = useState(0);
    const [filtering, setFiltering] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Nombre",
            accessorKey: 'nombreCompletoCliente'
        },
        {
            header: "Rut",
            accessorKey: 'rutCliente'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefonoCliente'
        },
        {
            header: "Email",
            accessorKey: 'emailCliente'
        },
        {
            header: "Estado",
            accessorKey: 'estadoCliente',
            cell:(fila)=>{
                return(
                    (fila.getValue('estadoCliente') ? 
                        <span className="textosNormal"><span className="fa fa-check-circle-o text-success"></span></span> : 
                        <span className="textosNormal"><span className="fa fa-times-circle text-bg-danger"></span></span>
                    )
                )
            }
        },
        {
            header: "Acciones",
            accessorKey: 'idCliente',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="transparent-button" onClick={() => editarCliente(fila.getValue('idCliente'))}>
                                    <span className="textosNormal"><span className="fa fa-pencil-square-o"></span></span>
                                </button>
                            </td>
                            <td>
                                <button className="transparent-button" onClick={() => asociarVehiculo(fila.getValue('idCliente'))}>
                                    <span className="textosNormal textos"><span className="fa fa-car"></span></span>
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
        listarClientes();
    }, [showList]);
    const cerrarModal = ()=>{
        listarClientes();
        setShowModal(false);
    }
    const cerrarModal2 = ()=>{
        setShowModal2(false);
    }

    const editarCliente = (idCliente)=>{
        setIdCliente(idCliente);
        setShowModal(true);
    }
    const asociarVehiculo = (idCliente)=>{
        setIdCliente(idCliente);
        setShowModal2(true);
    }

    const listarClientes = async() =>{
        await Axios.get("http://localhost:8010/api/clientes",{headers: {'Authorization': token,},})
        .then((response) => {setClientes(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de clientes:", error.response);});
    };
    const tabla = useReactTable(
        {
            data: clientesList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
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
                    <EditarClientes id={idCliente}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal()}><span className='textosNormal'><span className='fa fa-close'></span>&nbsp;Cerrar</span></button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal2} onHide={() => setShowModal2(false)}>
                <Modal.Body>
                    <VehiculosCliente id={idCliente}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal2()}><span className='textosNormal'><span className='fa fa-close'></span>&nbsp;Cerrar</span></button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoClientes
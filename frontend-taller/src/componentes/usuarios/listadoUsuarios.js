import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";
import EditarUsuario from "./EditarUsuario";
import { Modal } from 'react-bootstrap';

function ListadoUsuarios(){
    const [usuariosList, setUsuarios] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [filtering, setFiltering] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Nombre",
            accessorKey: 'nombreCompletoUsuario'
        },
        {
            header: "rut",
            accessorKey: 'rutUsuario'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefonoUsuario'
        },
        {
            header: "Email",
            accessorKey: 'emailUsuario'
        },
        {
            header: "Tipo Perfil",
            accessorKey: 'tipoPerfil'
        },
        {
            header: "Estado",
            accessorKey: 'estadoUsuario',
            cell:(fila)=>{
                return(
                    (fila.getValue('estadoUsuario') ? 
                        <span className="textosNormal"><span className="fa fa-check-circle-o text-success"></span></span> : 
                        <span className="textosNormal"><span className="fa fa-times-circle text-bg-danger"></span></span>
                    )
                )
            }
        },
        {
            header: "Editar/Eliminar",
            accessorKey: 'idUsuario',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="botonAccion" onClick={() => editarUsuario(fila.getValue('idUsuario'))}>
                                    <span className="textosNormal"><span className="fa fa-pencil-square-o"></span></span>
                                </button>
                            </td>
                            <td>
                                <button className="botonCancelar">
                                <span className="textosNormal"><span className="fa fa-trash"></span></span>
                                </button>
                            </td>
                        </tr>
                    </table>
                );
            },
        },
    ]
    useEffect(() => {
        listarUsuarios();
    }, []);
    const editarUsuario = async(idUsuario)=>{
        setIdUsuario(idUsuario);
        setShowModal(true);
    }
    const listarUsuarios = async() =>{
        await Axios.get("http://localhost:8010/api/usuarios",{headers: {'Authorization': token,},})
        .then((response) => {setUsuarios(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de usuarios:", error.response);});
    };
    const tabla = useReactTable(
        {
            data: usuariosList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
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
            <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <EditarUsuario id={idUsuario}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ListadoUsuarios
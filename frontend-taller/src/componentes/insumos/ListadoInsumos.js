import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import { Modal } from 'react-bootstrap';
import EditarInsumo from "./EditarInsumo";
import Axios from "axios";


function ListadoInsumos(){
    const [insumosList, setInsumos] = useState([]);
    const [datoInsumo, setDatoInsumo] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [sorting, setSorting] = useState([]);
    const [idInsumo, setIdInsumo] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Nombre",
            accessorKey: 'nombreInsumo'
        },
        {
            header: "Código",
            accessorKey: 'codigoInsumo'
        },
        {
            header: "Stock",
            accessorKey: 'cantidadInsumos',
            cell:(fila)=>{
                return(
                    (fila.getValue('cantidadInsumos') < 10 ? 
                        <span className="text-danger">{fila.getValue('cantidadInsumos')}</span> : 
                        <span className="text-success">{fila.getValue('cantidadInsumos')}</span>
                    )
                )
            }
        },
        {
            header: "Precio Compra",
            accessorKey: 'precioCompra'
        },
        {
            header: "Precio Venta",
            accessorKey: 'precioVenta'
        },
        {
            header: "Tipo",
            accessorKey: 'tipoInsumo'
        },
        {
            header: "Estado",
            accessorKey: 'estadoInsumo',
            cell:(fila)=>{
                return(
                    (fila.getValue('estadoInsumo') ? 
                        <span className="textosNormal"><span className="fa fa-check-circle-o text-success"></span></span> : 
                        <span className="textosNormal"><span className="fa fa-times-circle-o text-danger"></span></span>
                    )
                )
            }
        },
        {
            header: "Editar/Eliminar",
            accessorKey: 'id',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="botonAccion" onClick={() => editarInsumo(fila.getValue('id'))}>
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
        listarInsumos();
    }, []);
    const cerrarModal = ()=>{
        listarInsumos();
        setShowModal(false);
    }
    const editarInsumo = async(idInsumo)=>{
        setIdInsumo(idInsumo);
        setShowModal(true);
    }
    const listarInsumos = async() =>{
        await Axios.get("http://localhost:8010/api/insumos/general",{headers: {'Authorization': token,},})
        .then((response) => {setInsumos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    };
    const desactivarInsumo = async(id)=>{
        await Axios.put("http://localhost:8010/api/insumos/delete/" + id,{headers: {'Authorization': token,},})
        .then((response) => {setInsumos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    }

    const tabla = useReactTable(
        {
            data: insumosList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
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
                            <tr key={headerGroup.id} className="textos">
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
                    <EditarInsumo id={idInsumo}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal()}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoInsumos
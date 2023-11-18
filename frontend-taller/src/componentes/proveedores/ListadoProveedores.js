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
import EditarProveedor from "./EditarProveedor";

function ListadoProveedores(){
    const [razonSocial, setRazonSocial] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [rut, setRut] = useState("");
    const [banco, setBanco] = useState("");
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [idProveedor, setIdProveedor] = useState();
    const [proveedorList, setProveedores] = useState([]);
    const [bancosList, setBancos] = useState([]);
    const [tipoCuentasList, setTipoCuentas] = useState([]);
    const [editar, setEditar] = useState(false);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Razón Social",
            accessorKey: 'razonSocial'
        },
        {
            header: "Rut",
            accessorKey: 'rutProveedor'
        },
        {
            header: "Dirección",
            accessorKey: 'direccionProveedor'
        },
        {
            header: "Teléfono",
            accessorKey: 'telefonoProveedor'
        },
        {
            header: "Email",
            accessorKey: 'emailProveedor'
        },
        {
            header: "Editar/Eliminar",
            accessorKey: 'idProveedor',
            cell: (fila) => {
                return (
                    <table>
                        <tr>
                            <td>
                                <button className="botonAccion" onClick={() => editarProveedor(fila.getValue('idProveedor'))}>
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
        listarProveedores();
    }, []);
    const cerrarModal = ()=>{
        listarProveedores();
        setShowModal(false);
    }
    const listarProveedores = async() =>{
        await Axios.get("http://localhost:8010/api/proveedores",{headers: {'Authorization': token,},})
        .then((response) => {setProveedores(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener proveedores:", error.response);});
    };
    const editarProveedor = async(idProveedor)=>{
        setIdProveedor(idProveedor);
        setShowModal(true);
    }
    const tabla = useReactTable(
        {
            data: proveedorList,columns: columnas, getCoreRowModel: getCoreRowModel(), 
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
                    <EditarProveedor id={idProveedor}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={()=>cerrarModal()}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListadoProveedores
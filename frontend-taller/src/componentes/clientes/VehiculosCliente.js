import React from "react";
import 
    { 
        useReactTable, getCoreRowModel, 
        getPaginationRowModel, flexRender,
        getSortedRowModel, getFilteredRowModel
    } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";

function VehiculosCliente(){
    const [usuariosList, setUsuarios] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [filtering, setFiltering] = useState("");;
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "Patente",
            accessorKey: 'nombreCompletoUsuario'
        },
        {
            header: "Marca",
            accessorKey: 'rutUsuario'
        },
        {
            header: "Modelo",
            accessorKey: 'telefonoUsuario'
        }
    ]
    useEffect(() => {
        listarUsuarios();
    }, []);
    const editarUsuario = async(idUsuario)=>{
        setIdUsuario(idUsuario);
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
        </div>
    )
}

export default VehiculosCliente
import React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";

function ListadoClientes(){
    const [clientesList, setClientes] = useState([]);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "ID",
            accesorKey: 'idCliente'
        },
        {
            header: "Nombre",
            accesorKey: 'nombreCompletoCliente'
        },
        {
            header: "Rut",
            accesorKey: 'rutCliente'
        },
        {
            header: "Teléfono",
            accesorKey: 'telefonoCliente'
        },
        {
            header: "Email",
            accesorKey: 'emailCliente'
        },
        {
            header: "Estado",
            accesorKey: 'estadoCliente'
        },
        {
            header: "Editar/Eliminar",
            accesorKey: ''
        }
    ]
    useEffect(() => {
        listarClientes();
    }, []);

    const listarClientes = async() =>{
        await Axios.get("http://localhost:8010/api/clientes",{headers: {'Authorization': token,},})
        .then((response) => {setClientes(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de clientes:", error.response);});
    };
    const tabla = useReactTable({data: clientesList,columns: columnas, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel()});
    return(
        <div>
            <table className="table table-hover table-responsive-lg"> 
                <thead>
                    {
                       tabla.getHeaderGroups().map(headerGroup=> (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header=>(
                                        <th key={header.id}>
                                            {header.column.columnDef.header}
                                        </th>
                                    ))
                                }
                            </tr>
                        )) 
                    }
                </thead>
                <tbody>
                {clientesList.map((val) => {
                return (
                  <tr key={val.idCliente} className="">
                    <th scope="row">{val.idCliente}</th>
                    <td>{val.nombreCompletoCliente}</td>
                    <td>{val.rutCliente}</td>
                    <td>{val.telefonoCliente}</td>
                    <td>{val.emailCliente}</td>
                    <td>{val.estadoCliente  ? <span className="fa fa-check-circle-o text-success"></span> : <span className="fa fa-times-circle text-danger"></span>} </td>
                    <td align="center"><a href="#"><span className="fa fa-pencil-square-o"></span></a> / <a href="#"><span className="fa fa-trash"></span></a></td>
                  </tr>
                );
              })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
            <button>Incio</button>
            <button>Anterior</button>
            <button>Siguiente</button>
            <button>Final</button>

        </div>
    )
}

export default ListadoClientes
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

    const buscarcliente = async(rutCliente) =>{
        await Axios.get("http://localhost:8010/api/clientes/general/" + rutCliente,{headers: {'Authorization': token,},})
        .then((response) => {setClientes(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de clientes:", error.response);});
    };
    const listarClientes = async() =>{
        await Axios.get("http://localhost:8010/api/listadoClientes",{headers: {'Authorization': token,},})
        .then((response) => {setClientes(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de clientes:", error.response);});
    };
    const tabla = useReactTable({data: clientesList,columns: columnas, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel()});
    return(
        <div>
            <div>
                <span className="textos"><span className="fa fa-search"></span>&nbsp;Buscar rut:</span> <input list="rutsClientes" className="textosCajas textosNormal" placeholder="11111111-1"/>
                <datalist id="rutsClientes">
                    {clientesList.map((val) => {
                    return (
                        <option value={val.rutCliente}></option>
                        );
                    })}
                </datalist>
            </div>
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
                    <th scope="row"><span className="textos">{val.idCliente}</span></th>
                    <td><span className="textosNormal">{val.nombreCompletoCliente}</span></td>
                    <td><span className="textosNormal">{val.rutCliente}</span></td>
                    <td><span className="textosNormal">+{val.telefonoCliente}</span></td>
                    <td><span className="textosNormal">{val.emailCliente}</span></td>
                    <td>{val.estadoCliente  ? <h3><span className="fa fa-check-circle-o text-success" title="Activo"></span></h3> : <h3><span className="fa fa-times-circle text-danger" title="Inactivo"></span></h3>} </td>
                    <td>
                        <table>
                            <tr>
                                <td className="espaciado"><button className="btn-edit"><span className="fa fa-pencil-square-o"></span></button></td>
                                <td className="espaciado"><button className="btn-delete"><span className="fa fa-trash"></span></button></td>
                            </tr>
                        </table>
                    </td>
                  </tr>
                );
              })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
            <table align="center">
                <tr>
                    <td><button onClick={()=> tabla.setPageIndex(0)} className="enlaces"><span className="fa fa-step-backward"></span></button></td>
                    <td><button onClick={()=> tabla.previousPage()} className="enlaces"><span className="fa fa-backward"></span></button></td>
                    <td><button onClick={()=> tabla.nextPage()} className="enlaces"><span className="fa fa-forward"></span></button></td>
                    <td><button onClick={()=> tabla.setPageIndex(tabla.getPageCount()-1)} className="enlaces"><span className="fa fa-step-forward"></span></button></td>
                </tr>
            </table>
        </div>
    )
}

export default ListadoClientes
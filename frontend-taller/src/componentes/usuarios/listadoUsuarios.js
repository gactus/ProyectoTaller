import React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";

function ListadoUsuarios(){
    const [usuariosList, setUsuarios] = useState([]);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "ID",
            accesorKey: 'id'
        },
        {
            header: "Nombre",
            accesorKey: 'rutUsuario'
        },
        {
            header: "rut",
            accesorKey: 'rutUsuario'
        },
        {
            header: "Teléfono",
            accesorKey: 'telefonoUsuario'
        },
        {
            header: "Email",
            accesorKey: 'emailUsuario'
        },
        {
            header: "Tipo Perfil",
            accesorKey: 'tipoPerfil'
        },
        {
            header: "Estado",
            accesorKey: 'estadoUsuario'
        },
        {
            header: "Editar/Eliminar",
            accesorKey: ''
        }
    ]
    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = async() =>{
        await Axios.get("http://localhost:8010/api/usuarios",{headers: {'Authorization': token,},})
        .then((response) => {setUsuarios(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de usuarios:", error.response);});
    };
    const tabla = useReactTable({data: usuariosList,columns: columnas, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel()});
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
                {usuariosList.map((val) => {
                return (
                  <tr key={val.id} className="">
                    <th scope="row"><span className="textosNormal">{val.id}</span></th>
                    <td><span className="textosNormal">{val.nombreCompletoUsuario}</span></td>
                    <td><span className="textosNormal">{val.rutUsuario}</span></td>
                    <td><span className="textosNormal">{val.telefonoUsuario}</span></td>
                    <td><span className="textosNormal">{val.emailUsuario}</span></td>
                    <td><span className="textosNormal">{val.tipoPerfil}</span></td>
                    <td>{val.estadoUsuario  ? <h3><span className="fa fa-check-circle-o text-success"></span></h3> : <h3><span className="fa fa-times-circle text-bg-danger"></span></h3>}</td>
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

export default ListadoUsuarios
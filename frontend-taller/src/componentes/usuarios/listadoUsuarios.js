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
                    <th scope="row">{val.id}</th>
                    <td>{val.nombreCompletoUsuario}</td>
                    <td>{val.rutUsuario}</td>
                    <td>{val.telefonoUsuario}</td>
                    <td>{val.emailUsuario}</td>
                    <td>{val.tipoPerfil}</td>
                    <td>{val.estadoUsuario  ? <span className="fa fa-check-circle-o text-success"></span> : <span className="fa fa-times-circle text-bg-danger"></span>}</td>
                    <td><a href="#"><span className="fa fa-pencil-square-o"></span></a> / <a href="#"><span className="fa fa-trash"></span></a></td>
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

export default ListadoUsuarios
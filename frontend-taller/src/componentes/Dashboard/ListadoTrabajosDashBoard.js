import React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";

function ListadoTrabajosDashBoard(){
    const [trabajosList, setTrabajos] = useState([]);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "ID",
            accesorKey: 'id'
        },
        {
            header: "Detalle",
            accesorKey: 'detalleTrabajo'
        },
        {
            header: "Fecha",
            accesorKey: 'fechaTrabajo'
        },
        {
            header: "Prox. Mantención",
            accesorKey: 'fechaProxMantencion'
        },
        {
            header: "Rq. Notificación",
            accesorKey: 'requiereNotificacion'
        },
        {
            header: "Costo Trabajo",
            accesorKey: 'costoTotal'
        },
        {
            header: "Mecánico",
            accesorKey: 'nombreMecanico'
        },
        {
            header: "Estado",
            accesorKey: 'estadoTrabajo'
        }
    ]
    useEffect(() => {
        listarTrabajos();
    }, []);

    const listarTrabajos = async() =>{
        await Axios.get("http://localhost:8010/api/trabajos/listadoTrabajosAdmin",{headers: {'Authorization': token,},})
        .then((response) => {setTrabajos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    };
    const tabla = useReactTable({data: trabajosList,columns: columnas, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel()});
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
                {trabajosList.map((val) => {
                return (
                  <tr key={val.idTrabajo} className="">
                    <th scope="row">{val.idTrabajo}</th>
                    <td>{val.detalleTrabajo}</td>
                    <td>{val.fechaTrabajo}</td>
                    <td>{val.fechaProxMantencion}</td>
                    <td>{val.requiereNotificacion ? "SI" : "NO"}</td>
                    <td>$ {val.costoTotal}</td>
                    <td>{val.nombreMecanico}</td>
                    <td>{val.estadoTrabajo} </td>
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

export default ListadoTrabajosDashBoard
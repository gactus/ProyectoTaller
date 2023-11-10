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
                                        <th key={header.id} className="textos">
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
                    <th scope="row"><span className="textosNormal">{val.idTrabajo}</span></th>
                    <td><span className="textosNormal">{val.detalleTrabajo}</span></td>
                    <td><span className="textosNormal">{val.fechaTrabajo}</span></td>
                    <td><span className="textosNormal">{val.fechaProxMantencion}</span></td>
                    <td><span className="textosNormal">{val.requiereNotificacion ? "SI" : "NO"}</span></td>
                    <td><span className="textosNormal">$ {val.costoTotal}</span></td>
                    <td><span className="textosNormal">{val.nombreMecanico}</span></td>
                    <td><span className="textosNormal">{val.estadoTrabajo}</span></td>
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

export default ListadoTrabajosDashBoard
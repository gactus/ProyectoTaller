import React from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useEffect } from "react";    
import Axios from "axios";


function ListadoInsumos(){
    const [insumosList, setInsumos] = useState([]);
    const [datoInsumo, setDatoInsumo] = useState([]);
    const token = localStorage.getItem('token');
    const columnas = [
        {
            header: "ID",
            accesorKey: 'id'
        },
        {
            header: "Nombre",
            accesorKey: 'nombreInsumo'
        },
        {
            header: "Código",
            accesorKey: 'codigoInsumo'
        },
        {
            header: "Stock",
            accesorKey: 'cantidadInsumos'
        },
        {
            header: "Precio Compra",
            accesorKey: 'precioCompra'
        },
        {
            header: "Precio Venta",
            accesorKey: 'precioVenta'
        },
        {
            header: "Tipo",
            accesorKey: 'tipoInsumo'
        },
        {
            header: "Estado",
            accesorKey: 'estadoInsumo'
        },
        {
            header: "Editar/Eliminar",
            accesorKey: ''
        }
    ]
    useEffect(() => {
        listarInsumos();
    }, []);

    const listarInsumos = async() =>{
        await Axios.get("http://localhost:8010/api/insumos",{headers: {'Authorization': token,},})
        .then((response) => {setInsumos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    };
    const desactivarInsumo = async(id)=>{
        await Axios.put("http://localhost:8010/api/insumos/delete/" + id,{headers: {'Authorization': token,},})
        .then((response) => {setInsumos(response.data);})
        .catch((error) => {console.error("Hubo un error al obtener la lista de insumos:", error.response);});
    }

    const tabla = useReactTable({data: insumosList,columns: columnas, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel()});
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
                {insumosList.map((val) => {
                return (
                  <tr key={val.id} className="">
                    <th scope="row">{val.id}</th>
                    <td>{val.nombreInsumo}</td>
                    <td>{val.codigoInsumo}</td>
                    <td>{val.cantidadInsumos <10 ? <span className="text-danger">{val.cantidadInsumos}</span> : <span className="text-success">{val.cantidadInsumos}</span>}</td>
                    <td>$ {val.precioCompra}</td>
                    <td>$ {val.precioVenta}</td>
                    <td>{val.tipoInsumo}</td>
                    <td>{val.estadoInsumo  ? <span className="fa fa-check-circle-o text-success"></span> : <span className="fa fa-times-circle text-danger"></span>} </td>
                    <td>
                        <table>
                            <tr>
                                <td className="espaciado"><button onClick={() =>desactivarInsumo(val.id)} className="btn-edit"><span className="fa fa-pencil-square-o"></span></button></td>
                                <td className="espaciado"><button onClick={() =>desactivarInsumo(val.id)} className="btn-delete"><span className="fa fa-trash"></span></button></td>
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

export default ListadoInsumos
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
                {insumosList.map((val) => {
                return (
                  <tr key={val.id} className="">
                    <th scope="row"><span className="textosNormal">{val.id}</span></th>
                    <td><span className="textosNormal">{val.nombreInsumo}</span></td>
                    <td><span className="textosNormal">{val.codigoInsumo}</span></td>
                    <td>{val.cantidadInsumos <10 ? <span className="text-danger textosNormal">{val.cantidadInsumos}</span> : <span className="text-success textosNormal">{val.cantidadInsumos}</span>}</td>
                    <td><span className="textosNormal">$ {val.precioCompra}</span></td>
                    <td><span className="textosNormal">$ {val.precioVenta}</span></td>
                    <td><span className="textosNormal">{val.tipoInsumo}</span></td>
                    <td>{val.estadoInsumo  ? <h3><span className="fa fa-check-circle-o text-success"></span></h3> : <h3><span className="fa fa-times-circle text-danger"></span></h3>} </td>
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
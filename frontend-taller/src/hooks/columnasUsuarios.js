import { useMemo } from "react";

export default function useColumns() {
 const columns = useMemo(
   () => [
     {
       Header: "Id",
       accessor: "id"
     },
     {
       Header: "Nombre",
       accessor: "nombre"
     },
     {
       Header: "Rut",
       accessor: "nombre"
     },
     {
       Header: "Teléfono",
       accessor: "telefono"
     },
     {
       Header: "Email",
       accessor: "email"
     },
     {
       Header: "Tipo Perfil",
       accessor: "tipoPerfil"
     },
     {
       Header: "Estado",
       accessor: "tipoPerfil"
     }
   ],
   []
 );

 return columns;
}

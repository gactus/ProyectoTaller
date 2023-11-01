import React from "react";
import "../styleesheets/Dashboard.css";
import "../styleesheets/Proveedores.css";
import { useState, useEffect } from "react";    
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import Swal from "sweetalert2";

function Proveedores() {
  const [razonSocial, setRazonSocial] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rut, setRut] = useState("");
  const [banco, setBanco] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [id, setId] = useState();
  const [proveedorList, setProveedores] = useState([]);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getProveedores();
  }, []);

  const registrarProvedores = () => {
    Axios.post("http://localhost:3001/create", {
      razonSocial: razonSocial,
      direccion: direccion,
      telefono: telefono,
      rut: rut,
      banco: banco,
      numeroCuenta: numeroCuenta,
      tipoCuenta: tipoCuenta,
    })
      .then(() => {
        getProveedores();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registrado con Existo!!</strong>",
          html:
            "<i>El Proveedor <strong>" +
            razonSocial +
            "</strong> fue Registrado con Existo!!</i>",
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error("Hubo un error al registrar:", error.response);
      });
  };
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      razonSocial: razonSocial,
      direccion: direccion,
      telefono: telefono,
      rut: rut,
      banco: banco,
      numeroCuenta: numeroCuenta,
      tipoCuenta: tipoCuenta,
    }).then(() => {
      getProveedores();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizado con Existo!!</strong>",
        html:
          "<i>El Proveedor <strong>" +
          razonSocial +
          "</strong> fue Actualizado con Existo!!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiarCampos = () => {
    setRazonSocial("");
    setDireccion("");
    setTelefono("");
    setRut("");
    setBanco("");
    setNumeroCuenta("");
    setTipoCuenta("");
    setId("");
    setEditar(false);
  };

  const editarProveedor = (val) => {
    setEditar(true);

    setRazonSocial(val.razon_social);
    setDireccion(val.direccion);
    setTelefono(val.telefono);
    setRut(val.rut);
    setBanco(val.banco);
    setNumeroCuenta(val.numero_cuenta);
    setTipoCuenta(val.tipo_cuenta);
    setId(val.id);
  };

  const deleteProve = (id) => {
    Axios.put(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        getProveedores();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Eliminado con Éxito!</strong>",
          html:
            "<i>El Proveedor <strong>" +
            razonSocial +
            "</strong> fue Eliminado con Existo!!</i>",
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar:", error.response);
      });
  };

  const getProveedores = () => {
    Axios.get("http://localhost:8010/api/proveedores")
      .then((response) => {
        setProveedores(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener proveedores:", error.response);
      });
  };

  return (
    <main>
      <div className="container">
        <div class="card text-center">
          <div className="card-header">REGISTRAR PROVEEDORES</div>
          <div className="card-body">
            <div className="input-group">
              <span className="input-group-text row-cols-2" id="basic-addon1">
                Razon Social:
              </span>
              <input
                type="text"
                onChange={(event) => {
                  setRazonSocial(event.target.value);
                }}
                className="form-control"
                value={razonSocial}
                placeholder="Ingrese Razon Social "
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="datos-proveedores">
              <div className="input-group mb-3">
                <span className="input-group-text row-cols-2" id="basic-addon1">
                  Direccion:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setDireccion(event.target.value);
                  }}
                  className="form-control"
                  value={direccion}
                  placeholder="Ingrese Direccion "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Telefono:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setTelefono(event.target.value);
                  }}
                  className="form-control"
                  value={telefono}
                  placeholder="Ingrese Telefono "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Rut:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setRut(event.target.value);
                  }}
                  className="form-control"
                  value={rut}
                  placeholder="Ingrese Rut Empresa "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Banco:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setBanco(event.target.value);
                  }}
                  className="form-control"
                  value={banco}
                  placeholder="Ingrese Banco "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Numero Cuenta:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setNumeroCuenta(event.target.value);
                  }}
                  className="form-control"
                  value={numeroCuenta}
                  placeholder="Ingrese Numero Cuenta "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Tipo Cuenta:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setTipoCuenta(event.target.value);
                  }}
                  className="form-control"
                  value={tipoCuenta}
                  placeholder="Ingrese Tipo de Cuenta "
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="select-addon1">
                    Tipo Insumo Proveedor:
                  </span>
                  <select
                    className="form-control"
                    onChange={(event) => {
                      // Aquí puedes manejar el cambio de la selección si es necesario
                      console.log(event.target.value);
                    }}
                    aria-label="Dropdown"
                    aria-describedby="select-addon1"
                  >
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                    <option value="opcion4">Opción 4</option>
                  </select>
                </div>
              </div>
              <div>
                {editar ? (
                  <div>
                    <button className="btn btn-warning m-2" onClick={update}>
                      Actualizar
                    </button>
                    <button
                      className="btn btn-info m-2"
                      onClick={limpiarCampos}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={registrarProvedores}
                  >
                    Registrar
                  </button>
                )}
              </div>
            </div>
          </div>
          <div class="card-footer text-body-secondary"></div>
        </div>
        <br></br>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Razon Social</th>
              <th scope="col">Direccion</th>
              <th scope="col">Telefono</th>
              <th scope="col">Rut</th>
              <th scope="col">Banco</th>
              <th scope="col">Numero Cuenta</th>
              <th scope="col">Tipo Cuenta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedorList.map((val) => {
              return (
                <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.razon_social}</td>
                  <td>{val.direccion}</td>
                  <td>{val.telefono}</td>
                  <td>{val.rut}</td>
                  <td>{val.banco}</td>
                  <td>{val.numero_cuenta}</td>
                  <td>{val.tipo_cuenta}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          editarProveedor(val);
                        }}
                        className="btn btn-info"
                      >
                        {" "}
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteProve(val.id);
                        }}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Proveedores;

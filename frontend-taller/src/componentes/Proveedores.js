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
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [banco, setBanco] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [id, setId] = useState();
  const [proveedorList, setProveedores] = useState([]);
  const [bancosList, setBancos] = useState([]);
  const [tipoCuentasList, setTipoCuentas] = useState([]);
  const [editar, setEditar] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getProveedores();
    listarBancos();
    listarTipoCuentas();
  }, []);

  /* Obtenemos los datos Bancarios */
const listarBancos = async() =>{
    await Axios.get("http://localhost:8010/api/bancos",{headers: {'Authorization': token,},})
    .then((response) => {setBancos(response.data);})
    .catch((error) => {console.error("Hubo un error al obtener la lista de bancos:", error.response);});
};
const listarTipoCuentas = async() =>{
  await Axios.get("http://localhost:8010/api/tipoCuentas",{headers: {'Authorization': token,},})
  .then((response) => {setTipoCuentas(response.data);})
  .catch((error) => {console.error("Hubo un error al obtener la lista de Tipo de Cuentas Bancarias:", error.response);});

};

  /* Fin */
  const registrarProvedores = async() => {
      const datosProveedor = {
          rut: rut,
          razonSocial: razonSocial,
          direccion: direccion,
          telefono: telefono,
          email: email,
          banco: banco,
          numeroCuenta: numeroCuenta,
          tipoCuenta: tipoCuenta,
      }
      await Axios.post("http://localhost:8010/api/proveedores",{headers: {'Content-Type': 'application/json', 'Authorization': token,},
        datosProveedor
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
        Swal.fire({
          title: "<strong>Error</strong>",
          html:
              "<i>Atención: Hubo un problema al registrar el proveedor</i>",
          icon: "error",
          timer: 3000,
        });
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
      Swal.fire({title: "<strong>Actualizado con Existo!!</strong>",
        html:"<i>El Proveedor <strong>" + razonSocial + "</strong> fue Actualizado con Existo!!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiarCampos = () => {
    setRazonSocial("");
    setDireccion("");
    setTelefono("");
    setEmail("");
    setRut("");
    setBanco("");
    setNumeroCuenta("");
    setTipoCuenta("");
    setId("");
    setEditar(false);
  };

  const editarProveedor = (val) => {
    setEditar(true);

    setRazonSocial(val.razonSocial);
    setDireccion(val.direccionProveedor);
    setTelefono(val.telefonoProveedor);
    setEmail(val.emailProveedor);
    setRut(val.rutProveedor);
    setBanco(val.idBanco);
    setNumeroCuenta(val.numeroCuenta);
    setTipoCuenta(val.idTipoCuenta);
    setId(val.idProveedor);
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
  const getProveedores = async() => {
      await Axios.get("http://localhost:8010/api/proveedores",{headers: {'Authorization': token,},})
      .then((response) => {setProveedores(response.data);})
      .catch((error) => {console.error("Hubo un error al obtener proveedores:", error.response);});
  };

  return (
    <main>
      <div className="container">
        <div className="card text-center">
          <div className="card-header">REGISTRAR PROVEEDORES</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
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
                aria-label="RazonSocial"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="datos-proveedores">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
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
                  aria-label="Direccion"
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
                  aria-label="Telefono"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Email:
                </span>
                <input
                  type="text"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="form-control"
                  value={email}
                  placeholder="email@dominio.cl"
                  aria-label="Email"
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
                <select className="form-control" onChange={(event) => {setBanco(event.target.value);}}
                    aria-label="Dropdown" aria-describedby="select-addon1">
                  <option value="">--SELECCIONE--</option>
                  {bancosList.map((val) => {
                    return (
                      <option value={val.idBanco} key={val.idBanco}>{val.nombreBanco}</option>
                      );
                    })}
                  </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Numero Cuenta:
                </span>
                <input type="text" onChange={(event) => {setNumeroCuenta(event.target.value);}}
                  className="form-control" value={numeroCuenta} placeholder="Ingrese Numero Cuenta "
                  aria-label="Username" aria-describedby="numeroCuenta" maxLength={15}/>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Tipo Cuenta:
                </span>
                <select className="form-control" onChange={(event) => {setTipoCuenta(event.target.value);}}
                aria-label="Dropdown" aria-describedby="tipoCuenta">
                  <option value="">--SELECCIONE--</option>
                  {tipoCuentasList.map((val) => {
                    return (
                      <option value={val.idTipoCuenta} key={val.idTipoCuenta}>{val.tipoCuenta}</option>
                      );
                    })}
                  </select>
                <div>
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
          <div className="card-footer text-body-secondary"></div>
        </div>
        <br></br>
        <div>
          <table className="table table-striped">
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
                  <tr key={val.idProveedor}>
                    <th scope="row">{val.idProveedor}</th>
                    <td>{val.razonSocial}</td>
                    <td>{val.direccionProveedor}</td>
                    <td>{val.telefonoProveedor}</td>
                    <td>{val.rutProveedor}</td>
                    <td>{val.nombreBanco}</td>
                    <td>{val.numeroCuenta}</td>
                    <td>{val.tipoCuentaBancaria}</td>
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
                            deleteProve(val.idProveedor);
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
      </div>
    </main>
  );
}

export default Proveedores;


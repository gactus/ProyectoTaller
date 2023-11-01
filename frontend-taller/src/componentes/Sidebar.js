import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styleesheets/Dashboard.css';
import avatar from '../imagenes/avatar.jpg'; 
const images = require.context('../icons/', true)



const dashboardItems = [
  { iconPath: 'icons-cliente.png', altText: 'Dashhboard', buttonText: 'Home', path: '/Dashboard', classIcon: 'fa fa-home', classTextos: 'enlaces' },
  { iconPath: 'icons-cliente.png', altText: 'Clientes', buttonText: 'Clientes', path: '/clientes', classIcon: 'fa fa-address-book', classTextos: 'enlaces' },
  { iconPath: 'icons-tareas.png', altText: 'Trabajos', buttonText: 'Trabajos', path: '/trabajos', classIcon: 'fa fa-cogs', classTextos: 'enlaces' },
  { iconPath: 'icons-proveedores.png', altText: 'Proveedores', buttonText: 'Proveedores', path: '/proveedores', classIcon: 'fa fa-vcard', classTextos: 'enlaces' },
  { iconPath: 'icons-usuarios.png', altText: 'Mantenedor Usuarios', buttonText: 'Usuarios', path: '/registrarusuario', classIcon: 'fa fa-group', classTextos: 'enlaces' },
  { iconPath: 'icons-inventario.png', altText: 'Inventario', buttonText: 'Inventario', path: '/inventario', classIcon: 'fa fa-cubes', classTextos: 'enlaces' },
  { iconPath: 'icons-gastos.png', altText: 'Gastos', buttonText: 'Gastos', path: '/gastos', classIcon: 'fa fa-money', classTextos: 'enlaces' },
  { iconPath: 'icons-gastos.png', altText: 'Reportería', buttonText: 'Reportes', path: '/userPerfiles', classIcon: 'fa fa-file-text', classTextos: 'enlaces' }
];

function Sidebar({ onLogout }) {
const navigate = useNavigate();

const handleLogout = () => {
  onLogout();
  navigate('/');
};

return (
  <nav className='sidebar'>
    <div className='bgAvatar'>
      <div>
        <img src={avatar} alt='Header Graphic'/>
      </div>
    </div>
    <div>
      <ul>
        {dashboardItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className={item.classTextos}><span className={item.classIcon}>&nbsp;</span>{item.buttonText}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <button onClick={handleLogout} className='enlaces'>Cerrar Sesión&nbsp;  <span className='fa fa-sign-out'></span></button>
        </li>
      </ul>
    </div>
    <div className='copyRight'>
      <span className='textosBlanco'>Derechos Reservados ©2023, Leonhardt Mechanics Services</span>
    </div>
  </nav>
);
}

export default Sidebar;
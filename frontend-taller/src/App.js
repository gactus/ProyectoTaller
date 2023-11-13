import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './componentes/Dashboard';
import Clientes from './componentes/Clientes';
import Trabajos from './componentes/Trabajos';
import Proveedores from './componentes/Proveedores';
import RegistrarUsuario from './componentes/RegistrarUsuario';
import Inventario from './componentes/Inventario';
import Gastos from './componentes/Gastos';
import Sidebar from './componentes/Sidebar';
import Login from './componentes/Login';
import Usuarios from './componentes/Usuarios';
import EditarUsuario from './componentes/EditarUsuario';
import Reportes from './componentes/Reportes';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    
    return (
        <Router>
            {isLoggedIn ? (
                <div className='dashboard-container'>
                    <Sidebar onLogout={handleLogout} />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/trabajos" element={<Trabajos />} />
                        <Route path="/proveedores" element={<Proveedores />} />
                        <Route path="/registrarusuario" element={<RegistrarUsuario />} />
                        <Route path="/inventario" element={<Inventario />} />
                        <Route path="/gastos" element={<Gastos />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/editarUsuario" element={<EditarUsuario />} />
                        <Route path="/reportes" element={<Reportes />} />
                    </Routes>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;
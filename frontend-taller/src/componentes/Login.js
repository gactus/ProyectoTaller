import React, { useState } from 'react';
import '../styleesheets/newLogin.css';
import logo from '../imagenes/logo-container.png';
import fondo from '../imagenes/fondo.png'
import axios from 'axios';

function Login({ onLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8010/api/login', {
                usuario: username,
                contrasena: password,
            });

            return { token: response.data.token }
        } catch (error) {
            return { error: true };
        }
    };

    const handdlelogin = async (e) => {
        e.preventDefault();

        const response = await login(username, password)

        if (response.error) {
            setError(response.error);
          } else {
            onLogin(response.token); // Iniciar sesión con éxito utilizando el token devuelto
          }
    }

    return (
        <div>
            <div className='container'>
                <div className='img'>
                    <img src={fondo} className='fondo' alt='Header Graphic'/>
                </div>
                <div className='login-container'>
                    <div className='login-form'>
                        <img src={logo} alt='Header Graphic' className='avatar'/>
                        <h2>Bienvenido</h2>
                        <div className='input-div uno focus'>
                            <div className='i'>
                                <i className='fa fa-user'></i>
                            </div>
                            <div>
                                <h5>Usuario:</h5>
                                <input onChange={(event) => {setUsername(event.target.value)}} className='input' type='text' placeholder='11111111-1'/>
                            </div>
                        </div>
                        <div className='input-div dos focus'>
                            <div className='i'>
                                <i className='fa fa-lock'></i>
                            </div>
                            <div>
                                <h5>Contraseña:</h5>
                                <input onChange={(event) => {setPassword(event.target.value)}} className='input' type='password' placeholder='Mi contraseña'/>
                            </div>
                        </div>
                        <button onClick={handdlelogin} className='btn'>Ingresar</button>
                    </div>
                    {error && <div className="error-message">Usuario o contraseña incorrectos</div>}
                </div>
            </div>
            <footer>
                Derechos Reservados ©2023, Leonhardt Mechanics Services.
            </footer>
        </div>
    );
}

export default Login;
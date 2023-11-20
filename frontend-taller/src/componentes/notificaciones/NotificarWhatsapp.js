import React from 'react';
import Axios from "axios";

function NotificarWhatsapp() {
    const [titulo, setTitulo] = React.useState('');
    const [mensaje, setMensaje] = React.useState('');
    const [whatsapp, setWhatsapp] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const response = await fetch(`https://api.whatsapp.com/send?phone=${whatsapp}&text=${titulo}%0A${mensaje}`);
        Axios.defaults.withCredentials = true;
        await Axios.get('https://api.whatsapp.com/send?phone=56995712224&text=prueba%0Aprueba')
        .then(()=>{
            console.log("Enviado OK")
        })
        .catch(err=>{
            console.log(err)
        })
    };

    return (
        <div className='card'>
        <div className='card-header'>
            <h3><span className='fa fa-whatsapp'></span>&nbsp;Notificar vía WhatsApp</h3>
        </div>
        <div className='card-body'>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <input id="titulo" name="name" type="text" placeholder="titulo" className="textosCajas2 textosNormal text-uppercase"
                            onChange={(event) => {setTitulo(event.target.value);}} required maxLength={50} />
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2'><span className="textos"><span className="fa fa-id-card"></span></span></div>
                        <div className="col-sm-10 col-md-10 col-lg-10">
                            <textarea className="textosCajasArea textosNormal text-uppercase" required maxLength={200} 
                            onChange={(event) => {setMensaje(event.target.value);}} placeholder='Mensaje'/>
                        </div>
                    </div>
                    <div className='row espaciadoVertical'>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 text-center">
                            <button type="submit" className="btn-agregar" onClick={handleSubmit}><h5><span className="fa fa-paper-plane"></span></h5>&nbsp;Notificar</button>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2 text-left'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default NotificarWhatsapp;
const loginVw = require('../models').loginVw;
const { encrypt } = require('../services/handleBcrypt');

const cambiarContrasena = async (req, res) => {
    const usuarioAutenticado = req.user;
    const nuevaContrasena = req.body.contrasenaUsuario;
    console.log({ usuarioAutenticado })

    try {
        const hashedContrasena = await encrypt(nuevaContrasena);

        await loginVw.update(
            { contrasenaUsuario: hashedContrasena },
            { where: { id: usuarioAutenticado.idUsuario } }
        );

        res.status(200).send({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).send({ message: 'Error al cambiar la contraseña' });
    }
};

module.exports = {
    cambiarContrasena,
};
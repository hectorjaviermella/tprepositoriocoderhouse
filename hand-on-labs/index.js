import ManagerUsuarios from './ManagerUsuarios.js'

const manager = new ManagerUsuarios();

const env = async () => {
    let primeraConsulta = await manager.consultarUsuarios();
    console.log(primeraConsulta);

const usuario ={
    nombre: "Mario",
    apellido: "Valencia",
    edad: 26,
    curso: "Backend",
};

let result = await manager.crearUsuario(usuario);
console.log(result);

let segundaconsulta = await manager.consultarUsuarios();
console.log(segundaconsulta);
};

env();
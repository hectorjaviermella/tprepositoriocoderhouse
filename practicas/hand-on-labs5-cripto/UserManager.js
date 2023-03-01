import fs  from "fs";
import crypto from "crypto";

class UserManager{
    constructor(){
        this.path = "./files/Usuarios.json";

    }
    consultarUsuarios = async() => {
       if (fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path,"utf-8");
        const usuarios = JSON.parse(data);
        return usuarios; 
       }else{
        return [];
       }
};

crearusuario =  async(usuario) => {
    const usuarios = await this.consultarUsuarios();
    
    //hashear la contrasena
    usuario.salt = crypto.randomBytes(128).toString("base64");
    usuario.contrasena = crypto.createHmac("sha256",usuario.salt).update(usuario.contrasena);
    usuarios.push(usuario);

    await fs.promises.writeFile(this.path, JSON.stringify(usuarios,null,"\t"));
    return usuario;    
}

validarUsuario=  async(nombreUsuario,contrasena) => {
    const usuarios = await this.consultarUsuarios();
    const indiceUsuario = usuarios.findIndex((usuario) => usuario.nombreUsuario === nombreUsuario);


};
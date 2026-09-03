import Usuario from "../Models/usuario.js";
import { hash, verify } from "@node-rs/argon2";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export default class UsuarioController {

    static async Create(req, res) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(422).json({
                message: "Todos os dados são obrigatórios"
            });
        }

        try {
            const hashPassword = await hash(senha);

            const usuario = new Usuario({
                nome,
                email,
                senha: hashPassword
            });

            const novoUsuario = await usuario.save();

            res.status(200).json({
                message: "Usuario inserido com sucesso",
                novoUsuario
            });

            return;

        } catch (error) {
            return res.status(500).json({
                message: "Problema ao inserir um Usuario",
                error
            });
        }
    }// fim Create


    static async Login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({
                message: "Todos os dados são obrigatórios"
            });
        }

        try {
            const usuario = await Usuario.findOne({ email }).select("+senha");

            if (!usuario) {
                return res.status(400).json({
                    message: "Credenciais Inválidas"
                });
            }
            
            const tokenPayload = {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }

            const token = jwt.sign(tokenPayload,JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,// evita acesso ao cookie via JavaScript (protege contra XSS)
                secure: process.env.NODE_ENV === "production",
                sameSite: "false", //tornar true em produção exige HTTPS
                maxAge: JWT_EXPIRATION_MS || 3600000 // 1 hora
            });

            return res.status(200).json({
                message: "Login realizado com sucesso",
                usuario:{ id: usuario._id, nome: usuario.nome, email: usuario.email },
                token}
            );
          
            const senhaValida = await verify(usuario.senha, senha);

            if (!senhaValida) {
                return res.status(400).json({
                    message: "Senha Inválida"
                });
            }

            return res.status(200).json({
                message: "Login realizado com sucesso",
                usuario
            });

        } catch (error) {
            return res.status(500).json({
                message: "Problema ao realizar o login",
                error
            });
        }
    }// fim Login

}
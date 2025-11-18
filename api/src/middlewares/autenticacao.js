import * as Usuario from '../models/UsuarioModel.js';
import * as sessoesModel from '../models/SessoesModel.js';
import * as sessoesCache from '../utils/sessoesCache.js';
import * as responses from '../utils/responses.js';

// Middleware de autenticação único baseado em sessões persistidas
export default async function autenticar(req, res, next) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            return responses.error(res, { statusCode: 498, message: "Token de autenticação não fornecido" });
        }

        const [bearer, token] = authorizationHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return responses.error(res, { statusCode: 498, message: "Formato de token inválido" });
        }

        const partesToken = token.split('.');
        if (partesToken.length !== 2) {
            return responses.error(res, { statusCode: 498, message: "Token mal formatado" });
        }

        const [loginIdRaw, chave_token] = partesToken;
        const loginId = Number(loginIdRaw);
        if (!loginId) {
            return responses.error(res, { statusCode: 498, message: "Identificador de sessão inválido" });
        }

        let sessao_usuario = sessoesCache.buscarSessao(loginIdRaw, chave_token);
        if (!sessao_usuario) {
            sessao_usuario = await sessoesModel.buscarSessao(loginId, chave_token);
            if (!sessao_usuario) {
                return responses.error(res, { statusCode: 498, message: 'Token de autenticação inválido' });
            }
            sessoesCache.addSessao(loginId, chave_token);
        }

        if (new Date(sessao_usuario.validade) < new Date()) {
            return responses.error(res, { statusCode: 498, message: 'Token de autenticação expirou' });
        }

        const usuario = await Usuario.buscarPorId(loginId);
        if (!usuario) {
            return responses.error(res, { statusCode: 401, message: 'Usuário vinculado ao token não existe mais' });
        }

        const { senha, ...usuarioSemSenha } = usuario;
        req.loginId = loginId;
        req.usuario = usuarioSemSenha;

        next();
    } catch (error) {
        return responses.error(res, { statusCode: 500, message: 'Erro na autenticação', data: { detalhe: error.message } });
    }
}
import * as Token from '../models/Token.js';
import * as Usuario from '../models/UsuarioModel.js';
import * as sessoesModel from '../models/SessoesModel.js';
import * as sessoesCache from '../utils/sessoesCache.js';
import * as responses from '../utils/responses.js';

// Middleware principal (compatível com rotas antigas)
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
        // Verificação por cache/local
        const [loginId] = token.split('.');
        const chave_token = token.replace(`${loginId}.`, "");
        let sessao_usuario = sessoesCache.buscarSessao(loginId, chave_token);
        if (sessao_usuario) {
            req.loginId = loginId;
            next();
            return;
        }
        // Buscar a sessão no banco de dados
        sessao_usuario = await sessoesModel.buscarSessao(loginId, chave_token);
        if (!sessao_usuario) {
            return responses.error(res, { statusCode: 498, message: 'Token de autenticação inválido' });
        }
        if (sessao_usuario.validade < new Date()) {
            return responses.error(res, { statusCode: 498, message: 'Token de autenticação expirou' });
        }
        req.loginId = loginId;
        next();
    } catch (error) {
        return responses.error(res, { statusCode: 500, message: 'Erro na autenticação', error: error.message });
    }
}

// Middleware compatível com rotas que usam "middlewareAutenticacao"
export const middlewareAutenticacao = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Token de autorização não fornecido'
            });
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Formato de token inválido. Use: Bearer <token>'
            });
        }
        // Consulta o token no banco de dados
        const tokenData = await Token.consultar(token);
        if (!tokenData) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Token inválidoo'
            });
        }
        // Verifica se o token não expirou
        const agora = new Date();
        if (tokenData.validade < agora) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Token expirado'
            });
        }
        req.loginId = tokenData.loginId;
        // --- Bloco extra estava fora do lugar, movido para dentro do try principal ---
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            erro: 'Erro na autenticação',
            detalhes: error.message
        });
    }
}
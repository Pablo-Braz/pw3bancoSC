import * as Token from '../models/Token.js';
import * as Usuario from '../models/UsuarioModel.js';

export const middlewareAutenticacao = async (req, res, next) => {
    try {
        // Obtém o token APENAS do header Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Token de autorização não fornecido'
            });
        }

        // Verifica se o formato é "Bearer token"
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
                erro: 'Token inválido'
            });
        }

        // Verifica se o token não expirou
        const agora = new Date();
        const validade = new Date(tokenData.validade);
        
        if (agora > validade) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Token expirado'
            });
        }

        // Busca os dados do usuário
        const usuario = await Usuario.consultarPorId(tokenData.usuario);
        
        if (!usuario || usuario.length === 0) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Usuário não encontrado'
            });
        }

        // Adiciona os dados do usuário na requisição
        req.usuario = usuario[0];
        req.tokenData = tokenData;

        // Continua para o próximo middleware/rota
        next();

    } catch (error) {
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({
            success: false,
            status: 500,
            erro: 'Erro interno do servidor'
        });
    }
};

export const middlewareAutenticacaoOpcional = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            // Se não há token, continua sem autenticação
            req.usuario = null;
            return next();
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) { 
            req.usuario = null; 
            return next(); 
        }

        const tokenData = await Token.consultar(token);
        
        if (!tokenData) {
            req.usuario = null;
            return next();
        }

        const agora = new Date();
        const validade = new Date(tokenData.validade);
        
        if (agora > validade) {
            req.usuario = null;
            return next();
        }

        const usuario = await Usuario.consultarPorId(tokenData.usuario);
        
        if (usuario && usuario.length > 0) {
            req.usuario = usuario[0];
            req.tokenData = tokenData;
        } else {
            req.usuario = null;
        }

        next();

    } catch (error) {
        console.error('Erro no middleware de autenticação opcional:', error);
        req.usuario = null;
        next();
    }
};
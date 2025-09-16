import * as Token from '../models/Token.js';
import * as Usuario from '../models/UsuarioModel.js';

export const middlewareAutenticacao = async (req, res, next) => {
    try {
        // Obtém o token do cookie ou do header Authorization
        const cookieToken = req.cookies?.sid;
        const authHeader = req.headers.authorization;
        
        if (!cookieToken && !authHeader) {
            return res.status(401).json({
                success: false,
                status: 401,
                erro: 'Token não fornecido'
            });
        }

        // Verifica se o formato é "Bearer token"
        let token = cookieToken;
        if (!token && authHeader) {
            const [bearer, t] = authHeader.split(' ');
            if (bearer === 'Bearer' && t) token = t;
        }
        if (!token) {
            return res.status(401).json({ success: false, status: 401, erro: 'Token inválido' });
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

        // Se faltar menos de 60 minutos, estende a validade e renova cookie
        const minutosRestantes = Math.floor((validade.getTime() - agora.getTime()) / 60000);
        if (minutosRestantes < 60) {
            try {
                await Token.extender(tokenData.usuario, 24);
                res.cookie('sid', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: process.env.MODE_ENV === 'production',
                    maxAge: 24 * 3600 * 1000
                });
            } catch (e) {
                console.warn('Falha ao estender token:', e?.message || e);
            }
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
        const cookieToken = req.cookies?.sid;
        const authHeader = req.headers.authorization;
        
        if (!cookieToken && !authHeader) {
            // Se não há token, continua sem autenticação
            req.usuario = null;
            return next();
        }

        let token = cookieToken;
        if (!token && authHeader) {
            const [bearer, t] = authHeader.split(' ');
            if (bearer === 'Bearer' && t) token = t;
        }
        if (!token) { req.usuario = null; return next(); }

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
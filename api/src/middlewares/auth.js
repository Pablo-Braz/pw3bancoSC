import * as Token from '../models/Token.js';
import * as responses from '../utils/response.js';

export default async function autenticar(req, res, next) {
  try {
    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authorizationHeader) {
      return responses.error(res, { statusCode: 401, message: 'Token de autenticação não fornecido' });
    }

    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return responses.error(res, { statusCode: 401, message: 'Formato de token inválido' });
    }

    // Consulta token na tabela `token`
    const tokenData = await Token.consultar(token);
    if (!tokenData) {
      return responses.error(res, { statusCode: 401, message: 'Token de autenticação inválido' });
    }

    const now = new Date();
    const validade = new Date(tokenData.validade);
    if (now > validade) {
      return responses.error(res, { statusCode: 401, message: 'Token de autenticação expirou' });
    }

    req.loginId = tokenData.usuario;
    req.tokenData = tokenData;
    return next();
  } catch (error) {
    return responses.error(res, { statusCode: 500, message: `Erro interno do servidor: ${error.message}` });
  }
}

export const autenticarOpcional = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authorizationHeader) {
      req.loginId = null;
      return next();
    }
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      req.loginId = null;
      return next();
    }

    const tokenData = await Token.consultar(token);
    if (!tokenData) {
      req.loginId = null;
      return next();
    }

    const now = new Date();
    const validade = new Date(tokenData.validade);
    if (now > validade) {
      req.loginId = null;
      return next();
    }

    req.loginId = tokenData.usuario;
    req.tokenData = tokenData;
    return next();
  } catch (error) {
    req.loginId = null;
    return next();
  }
};

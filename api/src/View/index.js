import * as responses from '../utils/response.js';

const result = (res, method, data, info_erro = false) => {
    if (method === 'GET') {
        if (Array.isArray(data) && data.length > 0) {
            return responses.success(res, { data });
        }
        return responses.notFound(res, { message: info_erro || 'Recurso não encontrado' });
    }

    if (method === 'POST') {
        return responses.created(res, { data });
    }

    if (method === 'PUT') {
        if (Array.isArray(data) && data.length > 0) {
            return responses.success(res, { data });
        }
        return responses.notFound(res, { message: 'Recurso não encontrado' });
    }

    if (method === 'DELETE') {
        if (data && data.affectedRows > 0) {
            return responses.success(res, { data: [] });
        }
        return responses.notFound(res, { message: 'Recurso não encontrado' });
    }

    return erro(res, 'Método http não identificado');
};

const erro = (res, erroMsg) => {
    console.error(erroMsg);
    return responses.error(res, { message: erroMsg });
};

export { result, erro };
import * as Veiculo from '../models/VeiculoModel.js';
import * as responses from '../utils/responses.js';

const getUsuarioId = (req) => req?.usuario?.id || req.loginId;

export const cadastrar = async (req, res) => {
    try {
        const usuarioId = getUsuarioId(req);
        if (!usuarioId) {
            return responses.error(res, { statusCode: 401, message: 'Usuário não autenticado' });
        }

        const veiculo = req.body || {};
        const obrigatorios = ['modelo', 'ano_fabricacao', 'ano_modelo', 'cor', 'num_portas', 'categoria_id', 'montadora_id', 'tipo_cambio', 'tipo_direcao'];
        const faltantes = obrigatorios.filter((campo) => !veiculo[campo]);

        if (faltantes.length > 0) {
            return responses.error(res, { statusCode: 400, message: `Campos obrigatórios ausentes: ${faltantes.join(', ')}` });
        }

        veiculo.usuario_id = usuarioId;

        const novoVeiculoId = await Veiculo.cadastrar(veiculo);
        return responses.created(res, {
            message: 'Veículo cadastrado com sucesso',
            data: { id: novoVeiculoId }
        });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const consultarTodos = async (req, res) => {
    try {
        const usuarioId = getUsuarioId(req);
        const search = req.query.search || '';
        const veiculos = await Veiculo.consultarTodos(search, usuarioId);

        if (!veiculos || veiculos.length === 0) {
            return responses.notFound(res, { message: 'Nenhum veículo encontrado' });
        }

        return responses.success(res, { message: 'Veículos consultados com sucesso', data: veiculos });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const consultarid = async (req, res) => {
    try {
        const usuarioId = getUsuarioId(req);
        const { id } = req.params;

        if (!Number(id)) {
            return responses.error(res, { statusCode: 400, message: 'ID inválido' });
        }

        const veiculo = await Veiculo.consultarPorId(id, usuarioId);
        if (!veiculo) {
            return responses.notFound(res, { message: 'Veículo não encontrado' });
        }

        return responses.success(res, { message: 'Veículo encontrado', data: veiculo });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const editar = async (req, res) => {
    try {
        const usuarioId = getUsuarioId(req);
        const { id } = req.params;

        if (!Number(id)) {
            return responses.error(res, { statusCode: 400, message: 'ID inválido' });
        }

        const veiculoExistente = await Veiculo.consultarPorId(id, usuarioId);
        if (!veiculoExistente) {
            return responses.notFound(res, { message: 'Veículo não encontrado' });
        }

        const resultado = await Veiculo.editar(id, req.body || {}, usuarioId);
        if (!resultado || resultado.affectedRows === 0) {
            return responses.error(res, { statusCode: 400, message: 'Não foi possível atualizar o veículo' });
        }

        const veiculoAtualizado = await Veiculo.consultarPorId(id, usuarioId);
        return responses.success(res, { message: 'Veículo atualizado com sucesso', data: veiculoAtualizado });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

export const deletar = async (req, res) => {
    try {
        const usuarioId = getUsuarioId(req);
        const { id } = req.params;

        if (!Number(id)) {
            return responses.error(res, { statusCode: 400, message: 'ID inválido' });
        }

        const veiculoExistente = await Veiculo.consultarPorId(id, usuarioId);
        if (!veiculoExistente) {
            return responses.notFound(res, { message: 'Veículo não encontrado' });
        }

        const resultado = await Veiculo.deletar(id, usuarioId);
        if (!resultado || resultado.affectedRows === 0) {
            return responses.error(res, { statusCode: 400, message: 'Não foi possível deletar o veículo' });
        }

        return responses.noContent(res, { message: 'Veículo deletado com sucesso' });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
};

// Mantido apenas para compatibilidade com possíveis chamadas existentes
export const consultar = async (_req, res) => {
    return responses.success(res, { message: 'Endpoint em desenvolvimento', data: [] });
};

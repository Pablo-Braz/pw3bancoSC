import * as Categoria from '../models/CategoriaModel.js';
import * as responses from '../utils/response.js';

export const cadastrar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) return responses.error(res, { statusCode: 400, message: 'Nome da categoria é obrigatório' });
    const id = await Categoria.cadastrar({ nome, descricao });
    return responses.created(res, { message: 'Categoria criada com sucesso', data: { id, nome, descricao } });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const listar = async (req, res) => {
  try {
    const search = req.query.search || '';
    const categorias = await Categoria.listar(search);
    if (!categorias || categorias.length === 0) return responses.notFound(res, { message: 'Nenhuma categoria encontrada' });
    return responses.success(res, { message: 'Categorias listadas com sucesso', data: categorias });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await Categoria.buscarPorId(id);
    if (!cat) return responses.notFound(res, { message: 'Categoria não encontrada' });
    return responses.success(res, { message: 'Categoria encontrada', data: cat });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const sucesso = await Categoria.atualizar(id, req.body);
    if (!sucesso) return responses.notFound(res, { message: 'Categoria não encontrada' });
    return responses.success(res, { message: 'Categoria atualizada com sucesso' });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

export const deletar = async (req, res) => {
  try {
    const id = req.params.id;
    const sucesso = await Categoria.deletar(id);
    if (!sucesso) return responses.notFound(res, { message: 'Categoria não encontrada' });
    return responses.success(res, { message: 'Categoria deletada com sucesso' });
  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

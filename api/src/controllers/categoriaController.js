import * as CategoriaModel from "../models/CategoriaModel.js";
import * as responses from "../utils/responses.js";

export const listar = async (req, res) => {
	try {
		const search = req.query.search || "";
		const categorias = await CategoriaModel.listar(search);

		if (!categorias || categorias.length === 0) {
			return responses.notFound(res, { message: "Nenhuma categoria encontrada" });
		}

		return responses.success(res, { message: "Categorias listadas", data: categorias });
	} catch (error) {
		return responses.error(res, { message: error.message });
	}
};

export const buscarPorId = async (req, res) => {
	try {
		const { id } = req.params;
		if (!Number(id)) {
			return responses.error(res, { statusCode: 400, message: "ID inválido" });
		}

		const categoria = await CategoriaModel.buscarPorId(id);
		if (!categoria) {
			return responses.notFound(res, { message: "Categoria não encontrada" });
		}

		return responses.success(res, { message: "Categoria encontrada", data: categoria });
	} catch (error) {
		return responses.error(res, { message: error.message });
	}
};

export const criar = async (req, res) => {
	try {
		const { tipo, icone } = req.body;
		if (!tipo || !icone) {
			return responses.error(res, { statusCode: 400, message: "Campos 'tipo' e 'icone' são obrigatórios" });
		}

		const categoria = await CategoriaModel.criar({ tipo, icone });
		return responses.created(res, { message: "Categoria criada com sucesso", data: categoria });
	} catch (error) {
		return responses.error(res, { message: error.message });
	}
};

export const atualizarTudo = async (req, res) => {
	try {
		const { id } = req.params;
		if (!Number(id)) {
			return responses.error(res, { statusCode: 400, message: "ID inválido" });
		}

		const { tipo, icone } = req.body;
		if (!tipo || !icone) {
			return responses.error(res, { statusCode: 400, message: "Campos 'tipo' e 'icone' são obrigatórios" });
		}

		const categoria = await CategoriaModel.atualizar(id, { tipo, icone });
		if (!categoria) {
			return responses.notFound(res, { message: "Categoria não encontrada" });
		}

		return responses.success(res, { message: "Categoria atualizada", data: categoria });
	} catch (error) {
		return responses.error(res, { message: error.message });
	}
};

export const atualizar = async (req, res) => {
	try {
		const { id } = req.params;
		if (!Number(id)) {
			return responses.error(res, { statusCode: 400, message: "ID inválido" });
		}

		const dados = req.body || {};
		if (!dados.tipo && !dados.icone) {
			return responses.error(res, { statusCode: 400, message: "Informe ao menos um campo para atualizar" });
		}

		const categoria = await CategoriaModel.atualizar(id, dados);
		if (!categoria) {
			return responses.notFound(res, { message: "Categoria não encontrada" });
		}

		return responses.success(res, { message: "Categoria atualizada", data: categoria });
	} catch (error) {
		return responses.error(res, { message: error.message });
	}
};

export const deletar = async (req, res) => {
	try {
		const { id } = req.params;
		if (!Number(id)) {
			return responses.error(res, { statusCode: 400, message: "ID inválido" });
		}

		const deletado = await CategoriaModel.deletar(id);
		if (!deletado) {
			return responses.notFound(res, { message: "Categoria não encontrada" });
		}

		return responses.noContent(res, { message: "Categoria removida" });
	} catch (error) {
		return responses.error(res, { message: error.message });
	}
};

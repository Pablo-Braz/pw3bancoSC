import pool from "../database/data.js";

const tabela = "categoria";

export const listar = async (search = "", cx = null) => {
	let localCx = cx;
	try {
		if (!localCx) {
			localCx = await pool.getConnection();
		}

		let query = `SELECT id, tipo, icone, data_cadastro, data_alteracao FROM ${tabela}`;
		const values = [];

		if (search) {
			query += " WHERE tipo LIKE ?";
			values.push(`%${search}%`);
		}

		const [rows] = await localCx.execute(query, values);
		return rows;
	} catch (error) {
		throw new Error("Erro ao listar categorias: " + error.message);
	} finally {
		if (!cx && localCx) {
			localCx.release();
		}
	}
};

export const buscarPorId = async (id, cx = null) => {
	let localCx = cx;
	try {
		if (!localCx) {
			localCx = await pool.getConnection();
		}

		const query = `SELECT id, tipo, icone, data_cadastro, data_alteracao FROM ${tabela} WHERE id = ?`;
		const [rows] = await localCx.execute(query, [id]);
		return rows[0] || null;
	} catch (error) {
		throw new Error("Erro ao buscar categoria: " + error.message);
	} finally {
		if (!cx && localCx) {
			localCx.release();
		}
	}
};

export const criar = async (categoria, cx = null) => {
	let localCx = cx;
	try {
		if (!localCx) {
			localCx = await pool.getConnection();
		}

		const { tipo, icone } = categoria;
		const query = `INSERT INTO ${tabela} (tipo, icone) VALUES (?, ?)`;
		const [result] = await localCx.execute(query, [tipo, icone]);

		if (result.affectedRows === 0) {
			throw new Error("Nenhuma categoria foi criada");
		}

		return buscarPorId(result.insertId, localCx);
	} catch (error) {
		throw new Error("Erro ao criar categoria: " + error.message);
	} finally {
		if (!cx && localCx) {
			localCx.release();
		}
	}
};

export const atualizar = async (id, campos, cx = null) => {
	let localCx = cx;
	try {
		if (!localCx) {
			localCx = await pool.getConnection();
		}

		const colunas = [];
		const values = [];

		for (const [chave, valor] of Object.entries(campos)) {
			if (valor !== undefined) {
				colunas.push(`${chave} = ?`);
				values.push(valor);
			}
		}

		if (colunas.length === 0) {
			throw new Error("Nenhum campo informado para atualização");
		}

		values.push(id);
		const query = `UPDATE ${tabela} SET ${colunas.join(", ")} WHERE id = ?`;
		const [result] = await localCx.execute(query, values);

		if (result.affectedRows === 0) {
			return null;
		}

		return buscarPorId(id, localCx);
	} catch (error) {
		throw new Error("Erro ao atualizar categoria: " + error.message);
	} finally {
		if (!cx && localCx) {
			localCx.release();
		}
	}
};

export const deletar = async (id, cx = null) => {
	let localCx = cx;
	try {
		if (!localCx) {
			localCx = await pool.getConnection();
		}

		const query = `DELETE FROM ${tabela} WHERE id = ?`;
		const [result] = await localCx.execute(query, [id]);
		return result.affectedRows > 0;
	} catch (error) {
		throw new Error("Erro ao deletar categoria: " + error.message);
	} finally {
		if (!cx && localCx) {
			localCx.release();
		}
	}
};

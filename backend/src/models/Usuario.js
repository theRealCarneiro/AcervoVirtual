class Usuario {
    static table () { return 'usuarios' }

    static list (connection) {
        return connection(Usuario.table());
    }

    static getById (connection, id) {
        return connection(Usuario.table()).where({ id: id });
    }

	static getByUsuario(connection, usuario) {
		return connection(Usuario.table()).where({ usuario: usuario }).first();
	}

	static login (connection, usuario) {
		return connection(Usuario.table()).select('senha').where({ usuario: usuario });
	}

    static insert(connection, usuario) {
        return connection(Usuario.table()).insert(usuario)
            .then(rows => { return { sucess: true } })
            .catch(error => {
                console.log(error);
                if (error.code === 'ER_DUP_ENTRY') return { sucess: false, code: 422, message: 'Usuário já cadastrado' };
				return { sucess: false, code: 500 }
            });
    }

    static delete(connection, id) {
        return connection(Usuario.table()).where({ id: id }).del();
    }

	static update(connection, id, newData) {
        return connection(Usuario.table()).update(newData).where({ id: id });
	}
}

module.exports = Usuario;

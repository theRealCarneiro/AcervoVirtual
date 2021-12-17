class Trabalho {
    static table () { return 'trabalhos' }

    static list (connection) {
        return connection(Trabalho.table());
    }

    static getById (connection, id) {
        return connection(Trabalho.table()).where({ id: id });
    }

    static insert(connection, trabalho) {
        return connection(Trabalho.table()).insert(trabalho)
            .then(rows => { return { sucess: true } })
            .catch(error => {
                console.log(error);
                if (error.code === 'ER_DUP_ENTRY') return {sucess: false, code: 422, message: 'Trabalho já cadastrado'};
                return { sucess: false, code: 500 }
            });
    }

	static update(connection, id, newData) {
        return connection(Trabalho.table()).update(newData).where({ id: id });
	}

    static delete(connection, id) {
        return connection(Trabalho.table()).where({ id: id }).del();
    }
}

module.exports = Trabalho;

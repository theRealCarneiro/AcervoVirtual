class Trabalho {
    static table () { return 'trabalhos' }

    static list (connection) {
        return connection(Trabalho.table());
    }

	static listVideos (connection) {
		return connection('videos');
	}

    static getById (connection, id) {
        return connection(Trabalho.table()).where({ id: id });
    }

    static search (connection, trabalho) {
		return connection(Trabalho.table()).where((qb) => { 
			for (let i in trabalho) qb.where(i, 'like', `%${trabalho[i]}%`) 
		});
    }

    static insert(connection, trabalho) {
        return connection(Trabalho.table()).insert(trabalho).returning('id')
			.then(id => { return { sucess: true, id: id[0] } })
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


// o pacote SEQUELIZE pode ajudar nas querys!!  

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: '3306',
    database: 'progme'
});

let db = {};

db.loadWorkshops = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM workshop', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.loadWorkshopById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM workshop WHERE Id = ${id}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.loadAvailableWorkshops = (Matricula) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM workshop WHERE workshop.Id NOT IN (SELECT Workshop_Id FROM inscricao WHERE Usuario_Matricula = ${Matricula});`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.loadWorkshopsNames = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT NomeWorkshop FROM workshop', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.loadUsersSubscriptions = (Matricula) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM workshop WHERE workshop.Id IN (SELECT Workshop_Id FROM inscricao WHERE Usuario_Matricula = ${Matricula})`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.findWorkshop = (nomeWorkshop) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM workshop WHERE NomeWorkshop LIKE '${nomeWorkshop}'`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
}

db.findUserData = (Matricula) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM usuario WHERE Matricula LIKE ${Matricula}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

db.postInscricao = (dadosInscricao) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO inscricao SET ?', dadosInscricao, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.deleteInscricao = (dadosInscricao) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM inscricao WHERE Workshop_Id = ${dadosInscricao.id} AND Usuario_Matricula = ${dadosInscricao.matricula}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.postUser = (novoCadastro) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO usuario SET ?', novoCadastro, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.postWorkshop = (novoCadastro) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO workshop SET ?', novoCadastro, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.updateWorkshop = (workshop) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE workshop SET NomeWorkshop = '${workshop.NomeWorkshop}', Local = '${workshop.Local}', DataMarcada = '${workshop.DataMarcada}', Avaliacao = '${workshop.Avaliacao}' WHERE Id = ${workshop.Id}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.deleteWorkshop = (idOfWorkshop) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM workshop WHERE Id = ${idOfWorkshop}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.avaliacaoWorkshop = (idOfWorkshop, Matricula, NotaAvaliada, Comentario) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE inscricao SET NotaAvaliada = ${NotaAvaliada}, Comentario = '${Comentario}' WHERE Usuario_Matricula = ${Matricula} AND Workshop_Id = ${idOfWorkshop}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.avaliacaoGetNotaAtual = (idOfWorkshop, Matricula) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT NotaAvaliada FROM inscricao WHERE Usuario_Matricula = ${Matricula} AND Workshop_Id = ${idOfWorkshop}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.buscarAvaliacoesDoWorkshop = (idOfWorkshop) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM inscricao WHERE Workshop_Id = ${idOfWorkshop}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.updateWorkshopsCapacityPlus = (idOfWorkshop) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE workshop SET Numero_Participantes = Numero_Participantes + 1 WHERE Id = ${idOfWorkshop}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

db.updateWorkshopsCapacityMinus = (idOfWorkshop) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE workshop SET Numero_Participantes = Numero_Participantes - 1 WHERE Id = ${idOfWorkshop}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

module.exports = db;
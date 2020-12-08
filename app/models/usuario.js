
module.exports = (sequelize, DataTypes) => {

  const Usuario = sequelize.define('Usuario', {
    Matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Nome: DataTypes.STRING,
    Email: DataTypes.STRING,
    Senha: DataTypes.STRING,
    eh_Aluno: DataTypes.BOOLEAN,
  }, {tableName: 'usuario', modelName: 'Usuario'});

  return Usuario;
  }
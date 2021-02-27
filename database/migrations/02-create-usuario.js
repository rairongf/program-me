module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Usuario', {
      Matricula: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      Nome: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      Email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      Senha: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      eh_Aluno: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Usuario');
  }
};

module.exports = {
  up: (queryInterface, DataTypes) => {

    return queryInterface.createTable('Inscricao', {
      Usuario_Matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,

        references: {
          model: 'Usuario',
          key: 'Matricula',
        }
      },
      Workshop_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,

        references: {
          model: 'Workshop',
          key: 'Id',
        }
      },
      NotaAvaliada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Comentario: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
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
    return queryInterface.dropTable('Inscricao');
  }
};
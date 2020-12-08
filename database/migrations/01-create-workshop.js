module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Workshop', {
      NomeWorkshop: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      DataMarcada: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: true,
      },
      Local: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      Numero_Participantes: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Workshop');
  }
};
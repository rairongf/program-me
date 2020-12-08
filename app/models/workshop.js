
module.exports = (sequelize, DataTypes) => {

  const Workshop = sequelize.define('Workshop', {
      NomeWorkshop: DataTypes.STRING,
      DataMarcada: DataTypes.DATE,
      Local: DataTypes.STRING,
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Numero_Participantes: DataTypes.INTEGER,
    }, {tableName: 'workshop', modelName: 'Workshop'});

    return Workshop;
  }
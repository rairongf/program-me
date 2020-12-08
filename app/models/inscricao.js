
module.exports = (sequelize, DataTypes) => {

    const Inscricao = sequelize.define('Inscricao', {
        Usuario_Matricula: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
    
            references: {
              model: 'Usuario',
              key: 'Matricula',
            }
          },
          Workshop_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
    
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
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
    }, {tableName: 'inscricao',modelName: 'Inscricao'});

    return Inscricao;
}
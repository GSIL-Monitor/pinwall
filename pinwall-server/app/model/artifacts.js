/* jshint indent: 2 */

module.exports = app => {

  const { STRING, INTEGER, DATE, TEXT,BOOLEAN } = app.Sequelize;

  const Artifacts = app.model.define('artifacts', {
    Id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: STRING(130),
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: TEXT,
      allowNull: true
    },
    profileImage: {
      type: STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    visible: {
      type: BOOLEAN,
      allowNull: true
    },
    createAt: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateAt: {
      type: DATE,
      allowNull: true
    }
  });

  Artifacts.associate = function() {
    app.model.Artifacts.belongsTo(app.model.Users, {targetKey: 'Id', foreignKey: 'userId'});
    app.model.Artifacts.hasMany(app.model.ArtifactAssets,{sourceKey:'Id',foreignKey: 'artifactId'});
    app.model.Artifacts.hasMany(app.model.ArtifactComments,{sourceKey:'Id',foreignKey: 'artifactId'});
    app.model.Artifacts.hasMany(app.model.ArtifactScores,{sourceKey:'Id',foreignKey: 'artifactId'});
    app.model.Artifacts.hasMany(app.model.ArtifactTerm,{sourceKey:'Id',foreignKey: 'artifactId'});

    app.model.Artifacts.belongsToMany(app.model.Topics, {
        through: {
          model: app.model.TopicArtifact,
          unique: false,
          scope: {
            taggable: 'artifacts'
          }
        },
        foreignKey: 'artifactId',
        constraints: false
    });

    app.model.Artifacts.belongsToMany(app.model.Terms, {
        through: {
          model: app.model.ArtifactTerm,
          unique: false,
          scope: {
            taggable: 'artifacts'
          }
        },
        foreignKey: 'artifactId',
        constraints: false
    });
  };

  Artifacts.listArtifacts = async function ({ offset = 0, limit = 10 }) {
    return await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Artifacts.findArtifactById = async function (id) {
    const artifact = await this.findById(id);
    if (!artifact) {
      this.ctx.throw(404, 'artifact not found');
    }
    return artifact;
  }

  Artifacts.createArtifact = async function (artifact) {
    return this.create(artifact,{
      include:[{
        association:Artifacts.ArtifactAssets
      }]
    });
  }

  Artifacts.updateArtifact = async function ({ id, updates }) {
    const artifact = await this.findById(id);
    if (!artifact) {
      this.ctx.throw(404, 'artifact not found');
    }
    return artifact.update(updates);
  }

  Artifacts.delArtifactById = async function (id) {
    const artifact = await this.findById(id);
    if (!artifact) {
      this.ctx.throw(404, 'artifact not found');
    }
    return artifact.destroy();
  }

  return Artifacts;
};

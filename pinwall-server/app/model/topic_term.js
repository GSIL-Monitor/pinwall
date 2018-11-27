/* jshint indent: 2 */

module.exports = app => {

  const { INTEGER } = app.Sequelize;

  const TopicTerm = app.model.define('topic_term', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    topicId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    termId: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  });

  return TopicTerm;
};
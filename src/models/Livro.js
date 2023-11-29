import Sequelize, { Model } from 'sequelize';

export default class Livro extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      author: Sequelize.STRING,
      gender: Sequelize.STRING,
      data: Sequelize.INTEGER,

    }, { sequelize });
    return this;
  }
}

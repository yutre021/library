import Sequelize, { Model } from 'sequelize';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      name: { type: Sequelize.STRING, defaultValue: '', validate: { len: { args: [3, 255], msg: 'Campo nome deve ter entre 3 e 255 caracteres' } } },
      email: { type: Sequelize.STRING, defaultValue: '', validate: { isEmail: { msg: 'E-mail inválido' } } },
      book: Sequelize.STRING,
      code: Sequelize.INTEGER,
    }, { sequelize });
    return this;
  }
}

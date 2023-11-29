import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Livro from '../models/Livro';
import Usuario from '../models/Usuario';

const models = [Livro, Usuario];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

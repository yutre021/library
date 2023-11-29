import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/UserRoutes';

const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.handlebars();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    // this.app.get('/', (req, res) => res.render('index'), { layout: 'landing' });
    this.app.use('/livros', homeRoutes);
    this.app.use('/usuarios/', userRoutes);
    this.app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
  }

  handlebars() {
    this.app.engine('handlebars', engine({ defaultLayout: 'main' }));
    this.app.set('view engine', 'handlebars');
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
